const mongoose = require('mongoose')

const { Schema, model } = mongoose

const ReferenciaSchema = new Schema(
  {
    titulo: {
      type: String,
      required: true,
      trim: true,
    },
    edicion: {
      type: String,
      trim: true,
    },
    editorial: {
      type: String,
      trim: true,
    },
    colaboradores: {
      type: [String],
      required: true,
      trim: true,
    },

    anio: {
      type: Number,
    },
    url: {
      type: String,
      trim: true,
    },
    tipo: {
      type: String,
      trim: true,
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

module.exports = model('Referencia', ReferenciaSchema)
