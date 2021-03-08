// paquetes npm
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')

// local imports
const conectarDB = require('./config/mongo')
const swaggerOptions = require('./config/swagger')
require('./config/config')

conectarDB()

// configuracion de express con cors
const app = express()
app.use(cors())
app.use(express.json({ extended: true }))

// configuracion de swagger
const swaggerSpecs = swaggerJsdoc(swaggerOptions)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

// Rutas del aplicativo
app.use('/api/usuarios', require('./routes/usuario.routes'))
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/carrera', require('./routes/carrera.routes'))
app.use('/api/periodo', require('./routes/periodo.routes'))
app.use('/api/asignatura', require('./routes/asignatura.routes'))
app.use('/api/tema', require('./routes/tema.routes'))
app.use('/api/referencia', require('./routes/referencia.routes'))
app.use('/api/plantilla', require('./routes/plantilla.routes'))

app.get('/', (req, res) => {
  res.send('Server UP')
})

// Levantar servidor
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`escuchando en ${process.env.PORT}`)
})
