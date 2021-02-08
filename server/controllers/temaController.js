const { validationResult } = require('express-validator')
const Tema = require('../models/Tema')

// crearTema ingresa una tema en la base de datos
exports.crearTema = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // revisar si ya existe en caso de existir retornarla
    const { nombre } = req.body
    const temaEncontrado = await Tema.findOne({ nombre })
    if (temaEncontrado) {
      res.status(400).json({
        msg: 'La tema con ese nombre ya existe',
        data: temaEncontrado,
      })
      return
    }

    // crear el modelo con los datos del Request body
    const temaModel = new Tema(req.body)

    // Guardar en la base de datos
    await temaModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'Tema ingresado con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarTemas Busca todos los temas en la base de datos
exports.buscarTemas = async (req, res) => {
  try {
    // buscar en la db
    const temas = await Tema.find({ padre: { $exists: true } })
      .populate({ path: 'padre', select: 'nombre' })
      .populate({ path: 'asignatura', select: 'nombre' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!temas) {
      res.status(404).json({ msg: 'No se encontraron temas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: temas,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarTema modifica una tema en la db buscandola por id
exports.modificarTema = async (req, res) => {
  try {
    // Guardar los datos enviados por request body
    const { nombre, padre, asignatura } = req.body
    const nuevosDatos = {}

    if (nombre) {
      nuevosDatos.nombre = nombre
    }

    if (padre) {
      nuevosDatos.padre = padre
    }

    if (asignatura) {
      nuevosDatos.asignatura = asignatura
    }

    // Revisar si existe por el id enviado
    let temaEncontrado = await Tema.findById(req.params.id)
    if (!temaEncontrado) {
      res.status(404).json({ msg: 'Tema ha modificar no encontrado' })
      return
    }

    // Modificar en la db
    temaEncontrado = await Tema.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevosDatos },
      { new: true }
    )
    res.status(200).json({
      msg: 'tema modificada con exito',
      data: temaEncontrado,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarTema Elimina un tema por el id
exports.eliminarTema = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    const temaEncontrado = await Tema.findById(req.params.id)
    if (!temaEncontrado) {
      res.status(404).json({ msg: 'Tema a eliminar no encontrado' })
      return
    }
    // Eliminar en la db
    await Tema.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Tema eliminado con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarTemasPadres Busca todos los temas en la base de datos
exports.buscarTemasPadres = async (req, res) => {
  try {
    // buscar en la db
    const temasPadre = await Tema.find({ padre: { $exists: false } })
      .populate({ path: 'asignatura', select: 'nombre' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!temasPadre) {
      res.status(404).json({ msg: 'No se encontraron temas' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: temasPadre,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
