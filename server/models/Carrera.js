const mongoose = require('mongoose')

const { Schema } = mongoose

const CarreraSchema = new Schema(
  {
    carrera: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    versionKey: false,
  }
)

module.exports = mongoose.model('Carrera', CarreraSchema)
