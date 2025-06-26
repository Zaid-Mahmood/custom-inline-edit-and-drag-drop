const jsonServer = require('json-server')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

// Create server
const server = jsonServer.create()

// Set up default middlewares (logger, static, cors, etc.)
const middlewares = jsonServer.defaults()
server.use(middlewares)

// Set up lowdb with FileSync adapter
const adapter = new FileSync('db.json')
const db = low(adapter)

// Set default structure if db is empty
db.defaults({  users: [], loginUser: [] }).write()

// Use default router with lowdb
const router = jsonServer.router(db)

// Optional: Custom routes before router
server.get('/', (req, res) => {
  res.json({ message: 'Welcome to the JSON Server with lowdb@1.0.0' })
})

// Optional: URL rewrites
server.use(jsonServer.rewriter({
  '/api/*': '/$1',
  '/blog/:resource/:id/show': '/:resource/:id'
}))

// Mount router
server.use(router)

// Start the server
const PORT = process.env.PORT || 5000
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`)
})

// Export server for testing or deployment
module.exports = server
