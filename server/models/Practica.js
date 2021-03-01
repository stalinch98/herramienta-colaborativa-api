const mongoose = require('mongoose')

const { Schema, model } = mongoose

const PracticaSchema = new Schema(
  {
    codigo: {
      type: String,
      trim: true,
      lowercase: true,
    },
    titulo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    objetivo: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    formato: {
      type: String,
      trim: true,
      lowercase: true,
    },
    requisitos: {
      type: [String],
      trim: true,
    },
    instrucciones: {
      type: [String],
      trim: true,
    },
    resultados: {
      type: [String],
      trim: true,
    },
    concluciones: {
      type: [String],
      trim: true,
    },
    temas: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Tema' }],
    },
    coordinador: {
      type: Schema.Types.ObjectId,
      ref: 'Usuario',
    },
    asignatura: {
      type: Schema.Types.ObjectId,
      ref: 'Asignatura',
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Practica', PracticaSchema)
