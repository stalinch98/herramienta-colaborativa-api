/* eslint-disable no-console */
const mongoose = require('mongoose')
require('dotenv').config({ path: '.env' })

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log('DB Conectada')
  } catch (error) {
    console.log('hubo un error')
    console.log(error)
    process.exit(1)
  }
}

module.exports = conectarDB
