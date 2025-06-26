// server.js
// See https://github.com/typicode/json-server#module
const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server') // <--- Move this line here!
const express = require('express') // If you added this for static files

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
const router = jsonServer.router(db) // Now `jsonServer` is defined

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 5000;

server.use(middlewares)

// Serve static files from the 'public' directory (if you're using this)
// server.use(express.static(path.join(__dirname, 'public')))

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