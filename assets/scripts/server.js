import http from 'http';

// import reload from 'reload';

import app from './app.js';

// Don't mix ES6 modules (import, export)
// with CommonJS (require/module.exports).

// Inject an environment variable from node.js if it exists
// otherwise 3000:
const port = process.env.PORT || 3000;

// The parameter is the listener/handler to respond to incoming requests:
const server = http.createServer(app);

server.listen(port);

// reload(server);
