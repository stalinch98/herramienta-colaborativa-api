const mongoose = require('mongoose')

const PeriodoSchema = mongoose.Schema(
  {
    periodo: {
      type: Number,
      required: true,
      trim: true,
      unique: [true, 'Periodo ya existente'],
    },
    fechainicio: {
      type: Date,
    },
    fechafin: {
      type: Date,
    },
    estado: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
)

module.exports = mongoose.model('Periodo', PeriodoSchema)
