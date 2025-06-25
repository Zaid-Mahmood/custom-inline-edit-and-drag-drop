// JSON Server module
const jsonServer = require("json-server");
const express = require('express');
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const port = 5000;

// Use default middlewares (logger, CORS, etc.)
server.use(middlewares);

// Add a custom route for "/"
server.get('/', (req, res) => {
    res.send('Hello');
});

// Optional rewriter for custom routes
server.use(
    jsonServer.rewriter({
        "/*": "/$1",
    })
);

// Use default JSON Server router
server.use(router);

// Start server
server.listen(port, () => {
    console.log(`JSON Server is running at http://localhost:${port}`);
});

// Export the Server API
module.exports = server;
