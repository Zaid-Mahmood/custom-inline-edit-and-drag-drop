// server.js
const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const express = require('express') // <--- Make sure this is added

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
const router = jsonServer.router(db)

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 5000;

server.use(middlewares)

// Serve static files from the 'public' directory
// Ensure 'public' folder is at your project root, parallel to 'api'
server.use(express.static(path.join(__dirname, '..', 'public'))) // <--- Adjusted path!
                                                               // If server.js is in /api, then public is ../public from __dirname

// Add this before server.use(router)
server.use(jsonServer.rewriter({
'/api/*': '/$1',
'/blog/:resource/:id/show': '/:resource/:id'
}))

server.use(router)
server.listen(port, () => {
console.log('JSON Server is running')
})

// Export the Server API
module.exports = server