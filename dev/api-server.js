const path = require('path')
const jsonServer = require('json-server')
const server = jsonServer.create()
const bodyParser = require('body-parser')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

// Use an in-memory database for testing.
const router = process.env.NODE_ENV === 'testing'
  ? jsonServer.router(require(path.join(__dirname, '..', 'test', 'e2e', 'api-db.js')))
  : jsonServer.router(path.join(__dirname, 'api-db.json'))

const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(bodyParser.json())
server.use(bodyParser.text({type: 'text/*'}))

// Add custom routes before JSON Server router
server.post('/filter-text', (req, res) => {
  const data = req.body.format === 'full_html_with_editor'
    ? req.body.value
    : entities.encode(req.body.value)
  res.status(200).send(data)
})

// Use default router
server.use(router)
server.listen(8081, () => {
  console.log('JSON Server is running on port 8081')
})
