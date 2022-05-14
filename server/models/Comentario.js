const mongoose = require('mongoose')

const {Schema, model} = mongoose

const ComentarioSchema = new Schema(
    {
        comentario: {
            type: String,
            required: true,
        },
        docente: {
            type: Schema.Types.ObjectId,
            ref: 'Usuario',
        },
        ejercicio: {
            type: Schema.Types.ObjectId,
            ref: 'Ejercicios',
        },
    },
    {
        versionKey: false,
    }
)

module.exports = model('Comentario', ComentarioSchema)
