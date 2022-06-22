const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const Usuario = require('../models/Usuario')
const Asignatura = require('../models/Asignatura')
const Calificacion = require('../models/Calificacion')
const Ejercicio = require('../models/Ejercicio')
const Plantilla = require('../models/Plantilla')

exports.crearUsuario = async (req, res) => {
    const errs = validationResult(req)
    if (!errs.isEmpty()) {
        res.status(400).json({errores: errs.array()})
        return
    }
    try {
        const {correo, contrasena} = req.body
        const usuarioEncontrado = await Usuario.findOne({correo})
        if (usuarioEncontrado) {
            res.status(400).json({msg: 'correo ya utilizado'})
            return
        }

        const usuario = new Usuario(req.body)
        const salt = await bcryptjs.genSalt(10)
        usuario.contrasena = await bcryptjs.hash(contrasena, salt)

        await usuario.save((err, room) => {
            if (err) {
                res.status(400).send(err)
                return
            }
            res.status(201).json({msg: 'usuario ingresado con exito', id: room.id})
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

exports.buscarUsuarios = async (_req, res) => {
    try {
        const usuarioEncontrado = await Usuario.find().select('-contrasena')
        if (!usuarioEncontrado) {
            res.status(400).json({msg: 'No se encontraron usuarios'})
            return
        }
        res.status(200).json({
            msg: 'busqueda realizada con exito',
            data: usuarioEncontrado,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

exports.buscarDocentes = async (_req, res) => {
    try {
        const usuarioEncontrado = await Usuario.find({rol: 'docente'}).select(
            '-contrasena'
        )
        if (!usuarioEncontrado) {
            res.status(400).json({msg: 'No se encontraron usuarios'})
            return
        }
        res.status(200).json({
            msg: 'busqueda realizada con exito',
            data: usuarioEncontrado,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

exports.buscarUsuario = async (req, res) => {
    try {
        const usuarioEncontrado = await Usuario.findById(req.params.id).select(
            '-contrasena'
        )
        if (!usuarioEncontrado) {
            res.status(400).json({msg: 'No se encontro el usuario'})
            return
        }

        res.status(200).json({
            msg: 'busqueda realizada con exito',
            data: usuarioEncontrado,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

exports.perfilUsuario = async (req, res) => {
    try {
        const usuarioEncontrado = await Usuario.findById(req.logueado.id).select(
            '-contrasena'
        )
        if (!usuarioEncontrado) {
            res.status(400).json({msg: 'No se encontro el usuario'})
            return
        }

        res.status(200).json({
            msg: 'busqueda realizada con exito',
            data: usuarioEncontrado,
        })
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

exports.modificarUsuario = async (req, res) => {
    const {nombre, apellido, correo, contrasena, rol, estado} = req.body
    const nuevosDatos = {}
    if (nombre) {
        nuevosDatos.nombre = nombre
    }

    if (apellido) {
        nuevosDatos.apellido = apellido
    }

    if (correo) {
        nuevosDatos.correo = correo
    }

    if (rol) {
        nuevosDatos.rol = rol
    }

    if (contrasena) {
        const salt = await bcryptjs.genSalt(10)
        nuevosDatos.contrasena = await bcryptjs.hash(contrasena, salt)
    }

    if (estado === false) {
        nuevosDatos.estado = estado
    }

    try {
        let usuarioEncontrado = await Usuario.findById(req.params.id)
        if (!usuarioEncontrado) {
            res.status(404).json({msg: 'Usuario no encontrado'})
            return
        }

        usuarioEncontrado = await Usuario.findByIdAndUpdate(
            {_id: req.params.id},
            {$set: nuevosDatos},
            {new: true}
        )
        res
            .status(200)
            .json({msg: 'usuario modificado con exito', data: usuarioEncontrado})
        return
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}

exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEncontrado = await Usuario.findById(req.params.id)
        if (!usuarioEncontrado) {
            res.status(404).json({msg: 'Usuario no encontrado'})
            return
        }

        if (req.logueado.rol !== 'administrador') {
            res
                .status(401)
                .json({msg: 'Permisos insuficientes para eliminar el usuario'})
            return
        }
        let pertenece = 'No se puede eliminar el usuario: '
        const asignaturasUsuario = await Asignatura.find({
            docentes: req.params.id,
        })
        if (asignaturasUsuario.length !== 0) {
            pertenece += 'pertenece a una asignatura, '
        }

        const coordinadorUsuario = await Asignatura.find({
            coordinador: req.params.id,
        })

        if (coordinadorUsuario.length !== 0) {
            pertenece += 'es coordinador de una asignatura, '
        }

        const calificacionUsuario = await Calificacion.find({
            docente: req.params.id,
        })
        if (calificacionUsuario.length !== 0) {
            pertenece += 'tiene calificaciones en ejercicios, '
        }

        const EjerciciosUsuario = await Ejercicio.find({docente: req.params.id})
        if (EjerciciosUsuario.length !== 0) {
            pertenece += 'tiene ejercicios hechos, '
        }

        const PlantillaUsuario = await Plantilla.find({
            coordinador: req.params.id,
        })
        if (PlantillaUsuario.length !== 0) {
            pertenece += 'tiene plantillas hechas, '
        }

        if (pertenece !== 'No se puede eliminar el usuario: ') {
            res.status(400).json({msg: pertenece})
            return
        }

        await Usuario.findOneAndRemove({_id: req.params.id})
        res.status(200).json({msg: 'usuario eliminado con exito'})
    } catch (error) {
        res.status(500).json({msg: 'hubo un error en el servidor'})
    }
}
