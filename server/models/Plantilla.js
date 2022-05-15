const mongoose = require('mongoose')

const {Schema, model} = mongoose

const PlantillaSchema = new Schema(
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
        numero: {
            type: Number,
            required: true,
        },

        formato: {
            type: String,
            trim: true,
            required: true,
            lowercase: true,
        },
        requisitos: {
            type: [String],
            trim: true,
            required: true,
        },
        instrucciones: {
            type: [String],
            trim: true,
            required: true,
        },
        resultados: {
            type: [String],
            trim: true,
            required: true,
        },
        objetivos: {
            type: [String],
            trim: true,
            required: true,
        },
        temas: {
            type: [{type: Schema.Types.ObjectId, ref: 'Tema'}],
        },
        coordinador: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Usuario',
        },
        asignatura: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Asignatura',
        },
    },
    {
        versionKey: false,
    }
)

module.exports = model('Plantilla', PlantillaSchema)
