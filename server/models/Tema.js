const mongoose = require('mongoose')

const { Schema, model } = mongoose

const TemaSchema = new Schema(
  {
    padre: {
      type: Schema.Types.ObjectId,
      ref: 'Tema',
    },
    nombre: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    asignatura: {
      type: Schema.Types.ObjectId,
      ref: 'Asignatura',
      required: true,
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Tema', TemaSchema)
