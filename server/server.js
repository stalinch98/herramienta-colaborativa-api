// paquetes npm
const express = require('express')
const swaggerUi = require('swagger-ui-express')
const swaggerJsdoc = require('swagger-jsdoc')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')

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

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
  })
)

// Rutas del aplicativo
app.use('/images', express.static(path.join(__dirname, 'uploads')))
app.use('/api/usuarios', require('./routes/usuario.routes'))
app.use('/api/login', require('./routes/auth.routes'))
app.use('/api/carrera', require('./routes/carrera.routes'))
app.use('/api/periodo', require('./routes/periodo.routes'))
app.use('/api/asignatura', require('./routes/asignatura.routes'))
app.use('/api/tema', require('./routes/tema.routes'))
app.use('/api/referencia', require('./routes/referencia.routes'))
app.use('/api/plantilla', require('./routes/plantilla.routes'))
app.use('/api/ejercicio', require('./routes/ejercicio.routes'))
app.use('/api/calificacion', require('./routes/calificacion.routes'))
app.use('/api/practica', require('./routes/practica.routes'))
app.use('/api/reportes', require('./routes/reportes.routes'))

app.get('/', (req, res) => {
  res.send('Server UP')
})

app.post('/upload', (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    res.status(400).send('No se ha enviado un archivo.')
    return
  }

  // console.log(req.protocol) // eslint-disable-line

  const { file } = req.files
  const extension = file.name.split('.')
  const nuevoNombre = `${file.md5}.${extension[extension.length - 1]}`

  const uploadPath = `${__dirname}/uploads/${nuevoNombre}`

  file.mv(uploadPath, (err) => {
    if (err) {
      res.status(500).send(err)
    }

    res.json({
      location: `${req.protocol}://${req.get('host')}/images/${nuevoNombre}`,
    })
  })
})

// Levantar servidor
app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`escuchando en ${process.env.PORT}`)
})
