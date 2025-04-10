// Require the framework and instantiate it
const fastify = require('fastify')({ logger: true });
const crypto = require('crypto');
const path = require('path');

const PORT = process.env.PORT || 3000;

// Origin configuration
const ORIGIN_A = process.env.ORIGIN_A || `http://origin1.com:${PORT}`;
const ORIGIN_B = process.env.ORIGIN_B || `http://origin2.com:${PORT}`;
const ORIGIN_C = process.env.ORIGIN_C || `http://origin3.com:${PORT}`;

// Register plugins
fastify.register(require('@fastify/cookie'));
fastify.register(require('@fastify/static'), {
  root: path.join(__dirname, 'public'),
  prefix: '/',
});

// Log cookies helper
const logCookies = (request, route) => {
  const cookies = request.cookies || {};
  if (Object.keys(cookies).length > 0) {
    fastify.log.info({ route, cookies }, 'Received cookies');
  }
};

// First route with cookie
fastify.get('/bounce-stateful', async (request, reply) => {
  logCookies(request, '/bounce-stateful');
  reply.status(302).redirect(`${ORIGIN_B}/redirect?setCookie=true`);
});

// Second route without cookie
fastify.get('/bounce-stateless', async (request, reply) => {
  logCookies(request, '/bounce-stateless');
  reply.status(302).redirect(`${ORIGIN_C}/redirect?setCookie=false`);
});

// Redirect route on ORIGIN_B that bounces back to ORIGIN_A
fastify.get('/redirect', async (request, reply) => {
  logCookies(request, '/redirect');
  const setCookie = request.query.setCookie === 'true';

  if (setCookie) {
    const uuid = crypto.randomUUID();
    reply.setCookie('tracking_id', uuid, {
      path: '/',
      httpOnly: true,
    });
  }

  reply.status(302).redirect(ORIGIN_A);
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
