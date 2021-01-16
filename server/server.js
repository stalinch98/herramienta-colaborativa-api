const express = require('express')
const cors = require('cors')
const conectarDB = require('./config/mongo')
require('./config/config')

const app = express()
app.use(cors())
app.use(express.json({ extended: true }))
app.use('/api/usuarios', require('./routes/usuario.router'))
app.use('/api/login', require('./routes/auth.router'))

conectarDB()

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`escuchando en ${process.env.PORT}`)
})
