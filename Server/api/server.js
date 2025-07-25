// server.js
const fs = require('fs')
const path = require('path')
const jsonServer = require('json-server')
const express = require('express')

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
const router = jsonServer.router(db)

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 5000;

server.use(middlewares)


server.use(express.static(path.join(__dirname, '..', 'public')))

server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
}))

server.use(router)
server.listen(port, () => {
    console.log('JSON Server is running')
})

module.exports = server