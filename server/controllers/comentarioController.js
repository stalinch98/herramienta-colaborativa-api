const { validationResult } = require('express-validator')
const Comentario = require('../models/Comentario')

// crearComentario ingresa un comentario en la base de datos
exports.crearComentario = async (req, res) => {
    // Validar errores de express-validator
    const errs = validationResult(req)
    if (!errs.isEmpty()) {
        res.status(400).json({ errores: errs.array() })
        return
    }

    try {
        req.body.docente = req.logueado.id

        // revisar si ya existe en caso de existir retornarla
        const { docente, ejercicio } = req.body
        const comentarioEncontrado = await Comentario.findOne({
            docente,
            ejercicio,
        })
        if (comentarioEncontrado) {
            res.status(400).json({
                msg: 'El docente ya califico este ejercicio',
                data: comentarioEncontrado,
            })
            return
        }

        // crear el modelo con los datos del Request body
        const comentarioModel = new Comentario(req.body)

        // Guardar en la base de datos
        await comentarioModel.save((err, room) => {
            if (err) {
                res.status(400).send({ msg: 'Error al insertar en la base de datos' })
                return
            }
            res
                .status(201)
                .json({ msg: 'Caomentario ingresado con exito', id: room.id })
        })
    } catch (error) {
        res.status(500).json({ msg: 'hubo un error en el servidor' })
    }
}

// buscarComentarios Busca todos los comentarios en la base de datos
exports.buscarComentarioEjer = async (req, res) => {
    try {
        // buscar en la db
        const comentarios = await Comentario.find({
            docente: req.logueado.id,
            ejercicio: req.params.ejercicio,
        })
            .populate({ path: 'docente', select: '-contrasena' })
            .exec()

        // si no hay datos retornar 404 not found
        if (!comentarios) {
            res.status(404).json({ msg: 'No se encontraron comentarios' })
            return
        }

        // caso contrario retornar la lista
        res.status(200).json({
            msg: 'Busqueda realizada con exito',
            data: comentarios,
        })
    } catch (error) {
        res.status(500).json({ msg: 'hubo un error en el servidor' })
    }
}

// modificarComentario modifica un comentario en la db buscandola por id
exports.modificarComentario = async (req, res) => {
    try {
        req.body.docente = req.logueado.id
        // Revisar si existe por el id enviado
        let comentarioEncontrado = await Comentario.findById(req.params.id)
        if (!comentarioEncontrado) {
            res.status(404).json({ msg: 'Comentario ha modificar no encontrado' })
            return
        }

        // Modificar en la db
        comentarioEncontrado = await Comentario.findByIdAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        )
        res.status(200).json({
            msg: 'Comentario modificado con exito',
            data: comentarioEncontrado,
        })
    } catch (error) {
        res.status(500).json({ msg: 'hubo un error en el servidor' })
    }
}

// eliminarComentario Elimina una comentario por el id
exports.eliminarComentario = async (req, res) => {
    try {
        // Revisar si existe por el id enviado
        const comentarioEncontrado = await Comentario.findById(req.params.id)
        if (!comentarioEncontrado) {
            res.status(404).json({ msg: 'Comentario a eliminar no encontrado' })
            return
        }
        // Eliminar en la db
        await Comentario.findOneAndRemove({ _id: req.params.id })
        res.status(200).json({ msg: 'Comentario eliminado con exito' })
    } catch (error) {
        res.status(500).json({ msg: 'hubo un error en el servidor' })
    }
}

// buscarComentariosEjercicio Busca todos los comentario de un ejercicio
exports.buscarComentarioEjercicio = async (req, res) => {
    try {
        // buscar en la db
        const comentarioAsignatura = await Comentario.find({
            ejercicio: req.params.id,
        })
            .populate({ path: 'docente', select: ['nombre', 'apellido'] })
            .exec()

        // si no hay datos retornar 404 not found
        if (!comentarioAsignatura) {
            res.status(404).json({ msg: 'No se encontraron comentarios' })
            return
        }

        // caso contrario retornar la lista
        res.status(200).json({
            msg: 'Busqueda realizada con exito',
            data: comentarioAsignatura,
        })
    } catch (error) {
        res.status(500).json({ msg: 'hubo un error en el servidor' })
    }
}
