const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 5000;

// Middleware
server.use(middlewares);

// Custom route for '/'
server.get('/', (req, res) => {
    res.send('Hello from the root route!');
});

// Rewriter (optional)
server.use(jsonServer.rewriter({
    '/*': '/$1',
}));

// JSON Server routes (/users, etc.)
server.use(router);

// Start server
server.listen(port, () => {
    console.log(`JSON Server is running at http://localhost:${port}`);
});
