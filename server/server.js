const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')

const conectarDB = require('./config/mongo')
const swaggerOptions = require('./config/swagger')
require('./config/config')

const app = express()
app.use(cors())
app.use(express.json({ extended: true }))

const swaggerSpecs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

app.use('/api/usuarios', require('./routes/usuario.router'))
app.use('/api/login', require('./routes/auth.router'))

conectarDB()

app.get('/', (req, res) => {
  res.send('Server UP')
})

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`escuchando en ${process.env.PORT}`)
})
