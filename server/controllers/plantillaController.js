const { validationResult } = require('express-validator')
const Plantilla = require('../models/Plantilla')
const Practica = require('../models/Practica')
const { asignaturasCoordinador } = require('../utils/coordinador')

// crearPlantilla ingresa una plantilla en la base de datos
exports.crearPlantilla = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    const { titulo, asignatura } = req.body

    // Revisar si es coordinador de la materia
    const esCoordinador = await asignaturasCoordinador(
      req.logueado.id,
      asignatura
    )

    if (!esCoordinador) {
      res.status(401).json({
        msg:
          'Permisos insuficientes para realizar la accion no es coordinador de la asignatura',
      })
      return
    }
    // Guardar el coordinador como el usuario logueado
    req.body.coordinador = req.logueado.id

    // revisar si ya existe en caso de existir retornarla
    const plantillaEncontrada = await Plantilla.findOne({ titulo, asignatura })
    if (plantillaEncontrada) {
      res.status(400).json({
        msg: 'La plantilla con ese título ya existe',
        data: plantillaEncontrada,
      })
      return
    }

    // crear el modelo con los datos del Request body
    const plantillaModel = new Plantilla(req.body)

    // Guardar en la base de datos
    await plantillaModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res
        .status(201)
        .json({ msg: 'Plantilla ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarPlantillas Busca todas las plantillas en la base de datos
exports.buscarPlantillas = async (req, res) => {
  try {
    // buscar en la db
    const plantillas = await Plantilla.find({ coordinador: req.logueado.id })
      .populate({ path: 'temas', select: 'nombre' })
      .populate({ path: 'asignatura', select: 'nombre' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!plantillas) {
      res.status(404).json({ msg: 'No se encontraron plantillas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: plantillas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarPlantilla modifica una plantilla en la db buscandola por id
exports.modificarPlantilla = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // Revisar si existe por el id enviado
    let plantillaEncontrada = await Plantilla.findById(req.params.id)
    if (!plantillaEncontrada) {
      res.status(404).json({ msg: 'Plantilla ha modificar no encontrada' })
      return
    }

    // Revisar si es coordinador de la materia
    const esCoordinador = await asignaturasCoordinador(
      req.logueado.id,
      plantillaEncontrada.asignatura.toString()
    )

    if (!esCoordinador) {
      res.status(401).json({
        msg:
          'Permisos insuficientes para realizar la accion no es coordinador de la asignatura',
      })
      return
    }

    // Modificar en la db
    plantillaEncontrada = await Plantilla.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({
      msg: 'plantilla modificada con exito',
      data: plantillaEncontrada,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarPlantilla Elimina una plantilla por el id
exports.eliminarPlantilla = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    const plantillaEncontrada = await Plantilla.findById(req.params.id)
    if (!plantillaEncontrada) {
      res.status(404).json({ msg: 'Plantilla a eliminar no encontrada' })
      return
    }

    // Revisar si es coordinador de la materia
    const esCoordinador = await asignaturasCoordinador(
      req.logueado.id,
      plantillaEncontrada.asignatura.toString()
    )

    if (!esCoordinador) {
      res.status(401).json({
        msg:
          'Permisos insuficientes para realizar la accion no es coordinador de la asignatura',
      })
      return
    }

    const TienePracticasAsignadas = await Practica.find({
      plantilla: req.params.id,
    })
    if (TienePracticasAsignadas.length !== 0) {
      res.status(404).json({ msg: 'Existen practicas con esta plantilla' })
      return
    }

    // Eliminar en la db
    await Plantilla.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Plantilla eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarPlantillaAsignatura Busca todas las plantillas en la base de datos de una asignatura
exports.buscarPlantillaAsignatura = async (req, res) => {
  try {
    // buscar en la db
    const plantillas = await Plantilla.find({ asignatura: req.params.id })
      .populate({ path: 'temas', select: 'nombre' })
      .populate({ path: 'asignatura', select: 'nombre' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!plantillas) {
      res.status(404).json({ msg: 'No se encontraron plantillas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: plantillas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarPlantillas Busca una plantilla en la base de datos por id
exports.buscarPlantillaID = async (req, res) => {
  try {
    // buscar en la db
    const plantillas = await Plantilla.findById(req.params.id)
      .populate({ path: 'temas', select: 'nombre' })
      .populate({ path: 'asignatura', select: 'nombre' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!plantillas) {
      res.status(404).json({ msg: 'No se encontraron plantillas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: plantillas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
