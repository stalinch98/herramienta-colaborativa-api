const mongoose = require('mongoose')

const { Schema, model } = mongoose

const CalificacionSchema = new Schema(
  {
    puntaje: {
      type: Number,
      required: true,
    },
    docente: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    ejercicio: {
      type: Schema.Types.ObjectId,
      ref: 'Ejercicios',
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Calificacion', CalificacionSchema)
