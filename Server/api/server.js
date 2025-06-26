// See https://github.com/typicode/json-server#module
const fs = require('fs')
const path = require('path') // <--- Add this line
const jsonServer = require('json-server') // Moved up for better organization

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))
const router = jsonServer.router(db)
const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const port = process.env.PORT || 5000;

server.use(middlewares)
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