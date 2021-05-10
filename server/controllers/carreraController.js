const { validationResult } = require('express-validator')
const Carrera = require('../models/Carrera')
const Asignatura = require('../models/Asignatura')

// crearCarrera ingresa una carrera en la base de datos
exports.crearCarrera = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // revisar si ya existe
    const { carrera } = req.body
    const carreraEncontrada = await Carrera.findOne({
      carrera: { $regex: carrera, $options: 'i' },
    })
    if (carreraEncontrada) {
      res.status(400).json({ msg: 'La carrera con ese nombre ya existe' })
      return
    }

    // crear el modelo con los datos del Request body
    const carreraModel = new Carrera(req.body)

    // Guardar en la base de datos
    await carreraModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'carrera ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarCarreras Busca todas las careras en la base de datos
exports.buscarCarreras = async (req, res) => {
  try {
    // buscar en la db
    const carreras = await Carrera.find()

    // si no hay datos retornar 404 not found
    if (!carreras) {
      res.status(404).json({ msg: 'No se encontraron carreras' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: carreras,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarCarrera modifica una carrera en la db buscandola por id
exports.modificarCarrera = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // Guardar los datos enviados por request body
    const { carrera } = req.body

    // Revisar si existe por el id enviado
    let carreraEncontrada = await Carrera.findById(req.params.id)
    if (!carreraEncontrada) {
      res.status(404).json({ msg: 'Carrera ha modificar no encontrada' })
      return
    }

    const carreraNombre = await Carrera.find({ carrera })
    if (carreraNombre.length !== 0) {
      res.status(404).json({ msg: 'Ya existe una carrera con ese nombre' })
      return
    }

    // Modificar en la db
    carreraEncontrada = await Carrera.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { carrera } },
      { new: true }
    )
    res
      .status(200)
      .json({ msg: 'carrera modificada con exito', data: carreraEncontrada })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarCarrera Elimina una carrera por el id
exports.eliminarCarrera = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    const carreraEncontrada = await Carrera.findById(req.params.id)
    if (!carreraEncontrada) {
      res.status(404).json({ msg: 'Carrera a eliminar no encontrada' })
      return
    }

    const TieneAsignatura = await Asignatura.find({ carrera: req.params.id })
    if (TieneAsignatura.length !== 0) {
      res
        .status(404)
        .json({ msg: 'La carrera cuenta con asignaturas asignadas' })
      return
    }
    // Eliminar en la db
    await Carrera.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Carrera eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
