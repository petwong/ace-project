const express = require('express')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const session = require('express-session')
const app = express()
const port = 3001

/**
 * Configurations
 */
app.use(cors({ origin: '*' }))
app.use(express.json({ extended: true, limit: '1mb' }))
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}))

app.listen(port, () => {
  console.log(`smartphone api listening on port ${port}`)
})

/**
 * Swagger Configurations
 */
const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Smartphone API',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options)

app.use(
  '/api-docs',
  swaggerUi.serve,
  swaggerUi.setup(specs, { explorer: true })
)

/**
 * Routes
 */
const smartphoneRoute = require('./routes/smartphone')
app.use('/api/v1/smartphones', smartphoneRoute)

const loginRoute = require('./routes/login')
app.use('/api/v1/login', loginRoute)
