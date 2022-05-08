const mongoose = require('mongoose')

const {Schema, model} = mongoose

const AsignaturaSchema = new Schema(
    {
        codigo: {
            type: String,
            required: true,
            trim: true,
            unique: true,
            lowercase: true,
        },
        nombre: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        carrera: {
            type: Schema.Types.ObjectId,
            ref: 'Carrera',
        },
        coordinador: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        docentes: {
            type: [{type: Schema.Types.ObjectId, ref: 'Usuario'}],
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

module.exports = model('Asignatura', AsignaturaSchema)
