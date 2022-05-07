const mongoose = require('mongoose')

const {Schema, model} = mongoose

const EjerciciosSchema = new Schema(
    {
        titulo: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        descripcion: {
            type: String,
            trim: true,
            lowercase: true,
        },

        dificultad: {
            type: Number,
            required: true,
        },

        ejercicio: {
            type: String,
            required: true,
            trim: true,
        },

        ejemplo: {
            type: String,
            trim: true,
        },

        evaluacion: {
            type: Number,
            default: 0,
        },

        solucion: {
            type: String,
            trim: true,
        },

        referencia: {
            type: [{type: Schema.Types.ObjectId, ref: 'Referencia'}],
        },

        tema: {
            type: Schema.Types.ObjectId,
            ref: 'Tema',
        },

        docente: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },

        archivado: {
            type: Boolean,
            default: false,
        },

        asignatura: {
            type: Schema.Types.ObjectId,
            ref: 'Asignatura',
        },
        periodo: {
            type: Schema.Types.ObjectId,
            ref: 'Periodo',
        }
    },
    {
        versionKey: false,
    }
)

module.exports = model('Ejercicios', EjerciciosSchema)
