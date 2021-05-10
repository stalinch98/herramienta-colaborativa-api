const { validationResult } = require('express-validator')
const Asignatura = require('../models/Asignatura')
const Ejercicio = require('../models/Ejercicio')
const Plantilla = require('../models/Plantilla')
const Referencia = require('../models/Referencia')
const Tema = require('../models/Tema')

// crearAsignatura ingresa una asignatura en la base de datos
exports.crearAsignatura = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // revisar si ya existe en caso de existir retornarla
    const { codigo } = req.body
    const asignaturaEncontrada = await Asignatura.findOne({ codigo })
    if (asignaturaEncontrada) {
      res.status(400).json({
        msg: 'La asignatura con ese codigo ya existe',
        data: asignaturaEncontrada,
      })
      return
    }

    // crear el modelo con los datos del Request body
    const asignaturaModel = new Asignatura(req.body)

    // Guardar en la base de datos
    await asignaturaModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res
        .status(201)
        .json({ msg: 'Asignatura ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarAsignaturas Busca todas las asignaturas en la base de datos
exports.buscarAsignaturas = async (req, res) => {
  try {
    // buscar en la db
    const asignaturas = await Asignatura.find()
      .populate({ path: 'docentes', select: '-contrasena' })
      .populate({ path: 'carrera' })
      .populate({ path: 'coordinador', select: '-contrasena' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!asignaturas) {
      res.status(404).json({ msg: 'No se encontraron asignaturas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: asignaturas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarAsignatura modifica una asignatura en la db buscandola por id
exports.modificarAsignatura = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // Revisar si existe por el id enviado
    let asignaturaEncontrada = await Asignatura.findById(req.params.id)
    if (!asignaturaEncontrada) {
      res.status(404).json({ msg: 'Asignatura ha modificar no encontrada' })
      return
    }

    // Modificar en la db
    asignaturaEncontrada = await Asignatura.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({
      msg: 'asignatura modificada con exito',
      data: asignaturaEncontrada,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// docentesAsignatura modifica los ocentes de una asignatura en la db buscandola por id
exports.docentesAsignatura = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // Guardar los datos enviados por request body
    const { docentes } = req.body

    const nuevosDatos = {}

    if (docentes) {
      nuevosDatos.docentes = docentes
    }
    // Revisar si existe por el id enviado
    let asignaturaEncontrada = await Asignatura.findById(req.params.id)
    if (!asignaturaEncontrada) {
      res.status(404).json({ msg: 'Asignatura ha modificar no encontrada' })
      return
    }

    // Modificar en la db
    asignaturaEncontrada = await Asignatura.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevosDatos },
      { new: true }
    )
    res.status(200).json({
      msg: 'Docentes actualizados con exito',
      data: asignaturaEncontrada,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarAsignatura Elimina una asignatura por el id
exports.eliminarAsignatura = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    const asignaturaEncontrada = await Asignatura.findById(req.params.id)
    if (!asignaturaEncontrada) {
      res.status(404).json({ msg: 'Asignatura a eliminar no encontrado' })
      return
    }

    let pertenece = 'No se puede eliminar la asignatura tiene asignado: '

    const EjerciciosAsignatura = await Ejercicio.find({
      asignatura: req.params.id,
    })
    if (EjerciciosAsignatura.length !== 0) {
      pertenece += 'ejercicios, '
    }

    const PlantillaAsignatura = await Plantilla.find({
      asignatura: req.params.id,
    })
    if (PlantillaAsignatura.length !== 0) {
      pertenece += 'plantillas, '
    }

    const ReferenciaAsignatura = await Referencia.find({
      asignatura: req.params.id,
    })
    if (ReferenciaAsignatura.length !== 0) {
      pertenece += 'referencias, '
    }

    const TemaAsignatura = await Tema.find({
      asignatura: req.params.id,
    })
    if (TemaAsignatura.length !== 0) {
      pertenece += 'temas, '
    }

    if (pertenece !== 'No se puede eliminar la asignatura tiene asignado: ') {
      res.status(400).json({ msg: pertenece })
      return
    }

    // Eliminar en la db
    await Asignatura.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Asignatura eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarAsignaturaCoordinador Busca todas las asignaturas en la base de datos
exports.buscarAsignaturaCoordinador = async (req, res) => {
  try {
    // buscar en la db
    const asignaturas = await Asignatura.find({ coordinador: req.logueado.id })
      .populate({ path: 'docentes', select: '-contrasena' })
      .populate({ path: 'carrera' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!asignaturas) {
      res.status(404).json({ msg: 'No se encontraron asignaturas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: asignaturas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarAsignaturasDocente Busca todas las asignaturas de un docente en la base de datos
exports.buscarAsignaturasDocente = async (req, res) => {
  try {
    // buscar en la db
    const asignaturas = await Asignatura.find({ docentes: req.logueado.id })
      .populate({ path: 'docentes', select: '-contrasena' })
      .populate({ path: 'carrera' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!asignaturas) {
      res.status(404).json({ msg: 'No se encontraron asignaturas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: asignaturas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
