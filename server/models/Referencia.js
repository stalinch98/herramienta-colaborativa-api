const mongoose = require('mongoose')

const { Schema, model } = mongoose

const ReferenciaSchema = new Schema(
  {
    referencia: {
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

module.exports = model('Referencia', ReferenciaSchema)
