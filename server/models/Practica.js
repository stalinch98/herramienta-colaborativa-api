const mongoose = require('mongoose')

const { Schema, model } = mongoose

const PracticaSchema = new Schema(
  {
    plantilla: {
      type: Schema.Types.ObjectId,
      ref: 'Plantilla',
    },
    ejercicios: {
      type: [{ type: Schema.Types.ObjectId, ref: 'Ejercicios' }],
    },
    periodo: {
      type: Schema.Types.ObjectId,
      ref: 'Periodo',
    },
  },
  {
    versionKey: false,
  }
)

module.exports = model('Practica', PracticaSchema)

/*
Calcular num usados
Calcular partes iguales
Seleccionar ejercicios 
*/
