const { validationResult } = require('express-validator')
const Referencia = require('../models/Referencia')
const Ejercicio = require('../models/Ejercicio')

// crearReferencia ingresa una referencia en la base de datos
exports.crearReferencia = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // revisar si ya existe en caso de existir retornarla
    const { titulo, asignatura } = req.body
    const referenciaEncontrado = await Referencia.findOne({
      titulo,
      asignatura,
    })
    if (referenciaEncontrado) {
      res.status(400).json({
        msg: 'La referencia ya existe',
        data: referenciaEncontrado,
      })
      return
    }

    // crear el modelo con los datos del Request body
    const referenciaModel = new Referencia(req.body)

    // Guardar en la base de datos
    await referenciaModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res
        .status(201)
        .json({ msg: 'Referencia ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarReferencias Busca todos los referencias en la base de datos
exports.buscarReferencias = async (_req, res) => {
  try {
    // buscar en la db
    const referencias = await Referencia.find()
      .populate({ path: 'asignatura', select: 'nombre' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!referencias) {
      res.status(404).json({ msg: 'No se encontraron referencias' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: referencias,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarReferencia modifica una referencia en la db buscandola por id
exports.modificarReferencia = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    let referenciaEncontrado = await Referencia.findById(req.params.id)
    if (!referenciaEncontrado) {
      res.status(404).json({ msg: 'Referencia ha modificar no encontrada' })
      return
    }

    // Modificar en la db
    referenciaEncontrado = await Referencia.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({
      msg: 'Referencia modificada con exito',
      data: referenciaEncontrado,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarReferencia Elimina una referencia por el id
exports.eliminarReferencia = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    const referenciaEncontrado = await Referencia.findById(req.params.id)
    if (!referenciaEncontrado) {
      res.status(404).json({ msg: 'Referencia a eliminar no encontrada' })
      return
    }

    const Utilizado = await Ejercicio.find({ referencia: req.params.id })
    if (Utilizado.length !== 0) {
      res
        .status(404)
        .json({ msg: 'Esta referencia esta utilizada en los ejercicios' })
      return
    }

    // Eliminar en la db
    await Referencia.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Referencia eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarReferenciasAsignatura Busca todos las referencias por asignatura
exports.buscarReferenciasAsignatura = async (req, res) => {
  try {
    // buscar en la db
    const referenciaAsignatura = await Referencia.find({
      asignatura: req.params.id,
    })
      .populate({ path: 'asignatura', select: 'nombre' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!referenciaAsignatura) {
      res.status(404).json({ msg: 'No se encontraron referencias' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: referenciaAsignatura,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
