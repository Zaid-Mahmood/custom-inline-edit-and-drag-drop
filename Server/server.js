const express = require('express');
const jsonServer = require('json-server');

const app = express();
const port = 5000;

// Set up JSON Server router and middlewares
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

app.use(middlewares);

// Custom root route
app.get('/', (req, res) => {
    res.send('Hello from the root route!');
});

// Mount JSON Server under / (or /api if you prefer)
app.use('/', router);

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
