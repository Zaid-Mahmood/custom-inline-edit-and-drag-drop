const jsonServer = require('json-server')
const { Low } = require('lowdb')
const { JSONFile } = require('lowdb/node') // optional for local, not used on Vercel
const { Memory } = require('lowdb')

const server = jsonServer.create()
const middlewares = jsonServer.defaults()

// Use in-memory adapter to avoid file system access
const adapter = new Memory()
const db = new Low(adapter)

async function startServer() {
  await db.read()
  db.data = db.data || {
    posts: [],
    comments: [],
    users: [],
    loginUser : []
  }

  const router = jsonServer.router(db) // use db object directly

  server.use(middlewares)

  server.use(jsonServer.rewriter({
    '/api/*': '/$1',
    '/blog/:resource/:id/show': '/:resource/:id'
  }))

  server.use(router)

  server.listen(5000, () => {
    console.log('JSON Server is running')
  })
}

startServer()

module.exports = server
