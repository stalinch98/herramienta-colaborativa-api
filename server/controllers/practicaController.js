const {validationResult} = require('express-validator')
const pdf = require('html-pdf')

const Practica = require('../models/Practica')
const Periodo = require('../models/Periodo')
const {
    practicaCoordinador,
    asignaturasCoordinador,
} = require('../utils/coordinador')

// crearPractica ingresa una practica en la base de datos
exports.crearPractica = async (req, res) => {
    // Validar errores de express-validator
    const errs = validationResult(req)
    if (!errs.isEmpty()) {
        res.status(400).json({errores: errs.array()})
        return
    }

    try {
        // Revisar si existe por el id enviado
        const periodoEncontrada = await Periodo.findOne({estado: true})
        if (!periodoEncontrada) {
            res.status(404).json({
                msg: 'No existe un periodo activo comunicare con un administrador',
            })
            return
        }

        // eslint-disable-next-line no-underscore-dangle
        req.body.periodo = periodoEncontrada._id

        const {plantilla} = req.body

        // Guardar la materia a la que pertenece la plantilla
        const asignatura = await practicaCoordinador(plantilla)

        if (!asignatura) {
            res.status(400).json({
                msg: 'Error con la plantilla ingresada',
            })
            return
        }

        // Revisar si es coordinador de la materia
        const esCoordinador = await asignaturasCoordinador(
            req.logueado.id,
            asignatura.toString()
        )

        if (!esCoordinador) {
            res.status(401).json({
                msg:
                    'Permisos insuficientes para realizar la accion no es coordinador de la asignatura',
            })
            return
        }

        // crear el modelo con los datos del Request body
        const practicaModel = new Practica(req.body)

        // Guardar en la base de datos
        await practicaModel.save((err, room) => {
            if (err) {
                res.status(400).send({msg: 'Error al insertar en la base de datos'})
                return
            }
            res.status(201).json({msg: 'Practica ingresada con exito', id: room.id})
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

// buscarPracticas Busca todas las practicas en la base de datos
exports.buscarPracticas = async (req, res) => {
    try {
        // buscar en la db
        const practicas = await Practica.find()
            .populate({path: 'plantilla'})
            .populate({path: 'ejercicios', populate: 'referencia'})
            .populate({path: 'periodo', select: 'periodo'})
            .exec()

        // si no hay datos retornar 404 not found
        if (!practicas) {
            res.status(404).json({msg: 'No se encontraron practicas'})
            return
        }

        // caso contrario retornar la lista
        res.status(200).json({
            msg: 'Busqueda realizada con exito',
            data: practicas,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

// modificarPractica modifica una practica en la db buscandola por id
exports.modificarPractica = async (req, res) => {
    try {
        // Revisar si existe por el id enviado
        let practicaEncontrada = await Practica.findById(req.params.id)
        if (!practicaEncontrada) {
            res.status(404).json({msg: 'Practica ha modificar no encontrada'})
            return
        }

        // Guardar la materia a la que pertenece la plantilla
        const asignatura = await practicaCoordinador(
            practicaEncontrada.plantilla.toString()
        )

        if (!asignatura) {
            res.status(401).json({
                msg: 'Error con la plantilla ingresada',
            })
            return
        }

        // Revisar si es coordinador de la materia
        const esCoordinador = await asignaturasCoordinador(
            req.logueado.id,
            asignatura.toString()
        )

        if (!esCoordinador) {
            res.status(401).json({
                msg:
                    'Permisos insuficientes para realizar la accion no es coordinador de la asignatura',
            })
            return
        }

        // Modificar en la db
        practicaEncontrada = await Practica.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json({
            msg: 'practica modificada con exito',
            data: practicaEncontrada,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

// eliminarPractica Elimina una practica por el id
exports.eliminarPractica = async (req, res) => {
    try {
        // Revisar si existe por el id enviado
        const practicaEncontrada = await Practica.findById(req.params.id)
        if (!practicaEncontrada) {
            res.status(404).json({msg: 'Practica a eliminar no encontrada'})
            return
        }

        // Guardar la materia a la que pertenece la plantilla
        const asignatura = await practicaCoordinador(
            practicaEncontrada.plantilla.toString()
        )

        if (!asignatura) {
            res.status(401).json({
                msg: 'Error con la plantilla ingresada',
            })
            return
        }

        // Revisar si es coordinador de la materia
        const esCoordinador = await asignaturasCoordinador(
            req.logueado.id,
            asignatura.toString()
        )

        if (!esCoordinador) {
            res.status(401).json({
                msg:
                    'Permisos insuficientes para realizar la accion no es coordinador de la asignatura',
            })
            return
        }

        // Eliminar en la db
        await Practica.findOneAndRemove({_id: req.params.id})
        res.status(200).json({msg: 'Practica eliminada con exito'})
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

// buscarPracticaAsignatura Busca todas las practicas en la base de datos de una asignatura
exports.buscarPracticaAsignatura = async (req, res) => {
    try {
        // buscar en la db
        const practicas = await Practica.find()
            .sort({_id: -1})
            .populate({
                path: 'plantilla',
                select: ['titulo', 'objetivos', 'asignatura'],
                populate: {
                    path: 'coordinador',
                    select: ['nombre', 'apellido'],
                },
                // match: { asignatura: req.params.id },
            })
            .populate({path: 'ejercicios', select: 'titulo'})
            .populate({path: 'periodo', select: 'periodo'})
            .exec()

        // si no hay datos retornar 404 not found
        if (!practicas) {
            res.status(404).json({msg: 'No se encontraron practicas'})
            return
        }

        // caso contrario retornar la lista
        res.status(200).json({
            msg: 'Busqueda realizada con exito',
            data: practicas,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

// buscarPracticas Busca una practica en la base de datos por id
exports.buscarPracticaID = async (req, res) => {
    try {
        // buscar en la db
        const practicas = await Practica.findById(req.params.id)
            .populate({
                path: 'plantilla',
                populate: {
                    path: 'asignatura',
                    select: ['nombre', 'carrera'],
                    populate: {
                        path: 'carrera',
                        select: 'carrera',
                    },
                },
                // match: { asignatura: req.params.id },
            })
            .populate({path: 'ejercicios', populate: 'referencia'})
            .populate({path: 'periodo', select: 'periodo'})
            .exec()

        // si no hay datos retornar 404 not found
        if (!practicas) {
            res.status(404).json({msg: 'No se encontraron practicas'})
            return
        }

        // caso contrario retornar la lista
        res.status(200).json({
            msg: 'Busqueda realizada con exito',
            data: practicas,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

// PDFPractica Retorna el pdf de una practica
exports.PDFPractica = async (req, res) => {
    try {
        // buscar en la db
        const practicas = await Practica.findById(req.params.id)

        // si no hay datos retornar 404 not found
        if (!practicas) {
            res.status(404).json({msg: 'No se encontraron practicas'})
            return
        }

        const config = {
            format: 'A4',
            orientation: 'portrait',
            border: '0.3in',
        }

        // Validar tipo de descarga
        let content = ''

        if (req.params.tipo === 'normal') {
            content = practicas.final
        }

        if (req.params.tipo === 'solucion') {
            content = practicas.finalSolucion
        }

        if (!content) {
            res.status(404).json({msg: 'No hay datos para enviar en el pdf'})
            return
        }

        pdf.create(content, config).toStream((err, stream) => {
            if (err) {
                res.json({msg: 'error'})
            }
            res.setHeader('Content-Type', 'application/pdf')
            res.setHeader('Content-Disposition', 'attachment; filename=data.pdf')

            stream.pipe(res)
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}