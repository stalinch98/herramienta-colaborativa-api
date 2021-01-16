const mongoose = require('mongoose')

const UsuarioSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'nombre es requerido'],
    trim: true,
  },
  apellido: {
    type: String,
    required: [true, 'apellido es requerido'],
    trim: true,
  },
  correo: {
    type: String,
    required: [true, 'correo es requerido'],
    trim: true,
    unique: true,
  },
  contrasena: {
    type: String,
    required: [true, 'contraseña es requerido'],
    trim: true,
  },
  rol: {
    type: String,
    default: 'docente',
  },

  estado: {
    type: Boolean,
    default: true,
  },
  registro: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Usuario', UsuarioSchema)
