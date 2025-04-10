# BTP Demo Server

Simple bounce tracker demo to test BTP (Bounce Tracking Protection).

## Features

- Three different origins (A, B, C) that can be configured
- Two types of cross-site redirects:
  - Stateful: Sets a cookie in the redirect (middle hop)
  - Stateless: Plain redirect without cookie or storage set.
- Configurable ports and origins via environment variables
- Cookie logging for debugging

## Installation

```bash
npm install
```

## Usage

Start the server:

```bash
npm start
```

The server will run on port 3000 by default. You can change this with the `PORT` environment variable:

```bash
PORT=8080 npm start
```

### Environment Variables

- `PORT`: Server port (default: 3000)
- `ORIGIN_A`: Override start origin A (default: http://origin1.com:${PORT})
- `ORIGIN_B`: Override bounce tracker origin B (default: http://origin2.com:${PORT})
- `ORIGIN_C`: Override bounce tracker origin C (default: http://origin3.com:${PORT})

### Routes

- `/`: Main page with links to both bounce types
- `/bounce-stateful`: Initiates a stateful bounce (sets a cookie)
- `/bounce-stateless`: Initiates a stateless bounce (no cookie)
- `/redirect`: Handles the redirect back to origin A

## Development

Run the linter:

```bash
npm run lint
```

Fix linting issues:

```bash
npm run lint:fix
```
