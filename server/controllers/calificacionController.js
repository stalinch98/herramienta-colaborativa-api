const { validationResult } = require('express-validator')
const Calificacion = require('../models/Calificacion')

// crearCalificacion ingresa una calificacion en la base de datos
exports.crearCalificacion = async (req, res) => {
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
    const calificacionEncontrado = await Calificacion.findOne({
      docente,
      ejercicio,
    })
    if (calificacionEncontrado) {
      res.status(400).json({
        msg: 'El docente ya califico este ejercicio',
        data: calificacionEncontrado,
      })
      return
    }

    // crear el modelo con los datos del Request body
    const calificacionModel = new Calificacion(req.body)

    // Guardar en la base de datos
    await calificacionModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res
        .status(201)
        .json({ msg: 'Calificacion ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarCalificaciones Busca todos los calificaciones en la base de datos
exports.buscarCalificacionEjer = async (req, res) => {
  try {
    // buscar en la db
    const calificaciones = await Calificacion.find({
      docente: req.logueado.id,
      ejercicio: req.params.ejercicio,
    })
      .populate({ path: 'docente', select: '-contrasena' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!calificaciones) {
      res.status(404).json({ msg: 'No se encontraron calificaciones' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: calificaciones,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarCalificacion modifica una calificacion en la db buscandola por id
exports.modificarCalificacion = async (req, res) => {
  try {
    req.body.docente = req.logueado.id
    // Revisar si existe por el id enviado
    let calificacionEncontrado = await Calificacion.findById(req.params.id)
    if (!calificacionEncontrado) {
      res.status(404).json({ msg: 'Calificacion ha modificar no encontrada' })
      return
    }

    // Modificar en la db
    calificacionEncontrado = await Calificacion.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({
      msg: 'Calificacion modificada con exito',
      data: calificacionEncontrado,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarCalificacion Elimina una calificacion por el id
exports.eliminarCalificacion = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    const calificacionEncontrado = await Calificacion.findById(req.params.id)
    if (!calificacionEncontrado) {
      res.status(404).json({ msg: 'Calificacion a eliminar no encontrada' })
      return
    }
    // Eliminar en la db
    await Calificacion.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Calificacion eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarCalificacionsEjercicio Busca todos las calificaciones de un ejercicio
exports.buscarCalificacionEjercicio = async (req, res) => {
  try {
    // buscar en la db
    const calificacionAsignatura = await Calificacion.find({
      ejercicio: req.params.id,
    })
      .populate({ path: 'docente', select: ['nombre', 'apellido'] })
      .exec()

    // si no hay datos retornar 404 not found
    if (!calificacionAsignatura) {
      res.status(404).json({ msg: 'No se encontraron calificaciones' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: calificacionAsignatura,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
