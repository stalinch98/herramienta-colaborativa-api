const { validationResult } = require('express-validator')
const Ejercicio = require('../models/Ejercicio')
const Plantilla = require('../models/Plantilla')
const Calificacion = require('../models/Calificacion')
const Practica = require('../models/Practica')
const { asignaturasCoordinador } = require('../utils/coordinador')
const { asignaturasDocente } = require('../utils/docente')

// crearEjercicio ingresa una ejercicio en la base de datos
exports.crearEjercicio = async (req, res) => {
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
      // Revisar si es docente de la materia
      const esDocente = await asignaturasDocente(req.logueado.id, asignatura)
      if (!esDocente) {
        res.status(401).json({
          msg:
            'Permisos insuficientes para realizar la accion no es coordinador o docente de la asignatura',
        })
        return
      }
    }

    // Guardar el coordinador como el usuario logueado
    req.body.docente = req.logueado.id

    // revisar si ya existe en caso de existir retornarla
    const ejercicioEncontrada = await Ejercicio.findOne({ titulo, asignatura })
    if (ejercicioEncontrada) {
      res.status(400).json({
        msg: 'El ejercicio con ese título ya existe',
        data: ejercicioEncontrada,
      })
      return
    }

    // crear el modelo con los datos del Request body
    const ejercicioModel = new Ejercicio(req.body)

    // Guardar en la base de datos
    await ejercicioModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res
        .status(201)
        .json({ msg: 'Ejercicio ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarEjercicios Busca todas las ejercicios en la base de datos
exports.buscarEjercicios = async (req, res) => {
  try {
    // buscar en la db
    const ejercicios = await Ejercicio.find()
      .sort({ _id: -1 })
      .populate({ path: 'tema', select: 'nombre' })
      .populate({ path: 'asignatura', select: 'nombre' })
      .populate({ path: 'docente', select: '-contrasena' })
      .populate({ path: 'referencia' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!ejercicios) {
      res.status(404).json({ msg: 'No se encontraron ejercicios' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: ejercicios,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarEjercicio modifica una ejercicio en la db buscandola por id
exports.modificarEjercicio = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // Revisar si existe por el id enviado
    let ejercicioEncontrada = await Ejercicio.findById(req.params.id)
    if (!ejercicioEncontrada) {
      res.status(404).json({ msg: 'Ejercicio ha modificar no encontrado' })
      return
    }

    // Revisar si es coordinador de la materia
    const esCoordinador = await asignaturasCoordinador(
      req.logueado.id,
      ejercicioEncontrada.asignatura.toString()
    )

    if (!esCoordinador) {
      // Revisar si es docente de la materia
      const esDocente = await asignaturasDocente(
        req.logueado.id,
        ejercicioEncontrada.asignatura.toString()
      )
      if (!esDocente) {
        res.status(401).json({
          msg:
            'Permisos insuficientes para realizar la accion no es coordinador o docente de la asignatura',
        })
        return
      }
    }

    // Modificar en la db
    ejercicioEncontrada = await Ejercicio.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    )
    res.status(200).json({
      msg: 'ejercicio modificada con exito',
      data: ejercicioEncontrada,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarEjercicio Elimina una ejercicio por el id
exports.eliminarEjercicio = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    let ejercicioEncontrada = await Ejercicio.findById(req.params.id)
    if (!ejercicioEncontrada) {
      res.status(404).json({ msg: 'Ejercicio a eliminar no encontrado' })
      return
    }

    // Revisar si es coordinador de la materia
    const esCoordinador = await asignaturasCoordinador(
      req.logueado.id,
      ejercicioEncontrada.asignatura.toString()
    )

    if (!esCoordinador) {
      // Revisar si es docente de la materia
      const esDocente = await asignaturasDocente(
        req.logueado.id,
        ejercicioEncontrada.asignatura.toString()
      )
      if (!esDocente) {
        res.status(401).json({
          msg:
            'Permisos insuficientes para realizar la accion no es coordinador o docente de la asignatura',
        })
        return
      }
    }

    // En caso de que el ejercicio este usado en una practica archivarlo
    const usado = await Practica.find({ ejercicios: ejercicioEncontrada._id })

    if (usado.length > 0) {
      ejercicioEncontrada = await Ejercicio.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: { archivado: true } },
        { new: true }
      )

      res.status(200).json({
        msg: 'Ejercicio ya utilizado ha sido archivado',
        data: ejercicioEncontrada,
      })

      return
    }

    // Eliminar en la db
    await Ejercicio.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Ejercicio eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarEjercicioAsignatura Busca todas las ejercicios en la base de datos de una asignatura
exports.buscarEjercicioAsignatura = async (req, res) => {
  try {
    // buscar en la db
    const ejercicios = await Ejercicio.find({ asignatura: req.params.id })
      .sort({ _id: -1 })
      .populate({ path: 'tema', select: 'nombre' })
      .populate({ path: 'asignatura', select: 'nombre' })
      .populate({ path: 'docente', select: '-contrasena' })
      .populate({ path: 'referencia' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!ejercicios) {
      res.status(404).json({ msg: 'No se encontraron ejercicios' })
      return
    }

    // CAMBIAR POR LOOKUP
    const nuevoEjercicio = []
    await Promise.all(
      ejercicios.map(async (ejercicio) => {
        const calificacionEjer = await Calificacion.find({
          ejercicio: ejercicio._id,
        })

        const ejer = {
          referencia: ejercicio.referencia,
          _id: ejercicio._id,
          titulo: ejercicio.titulo,
          descripcion: ejercicio.descripcion,
          dificultad: ejercicio.dificultad,
          tema: ejercicio.tema,
          asignatura: ejercicio.asignatura,
          docente: ejercicio.docente,
          evaluacion: ejercicio.evaluacion,
          archivado: ejercicio.archivado,
          calificacion: calificacionEjer,
        }
        // console.log(ejer.calificacion)
        // // ejercicio.calificacion = calificacionEjer
        nuevoEjercicio.push(ejer)
      })
    )

    nuevoEjercicio.sort((a, b) => {
      return a.titulo.localeCompare(b.titulo)
    })

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: nuevoEjercicio,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// const numUsado = async item => {
//   return Practica.find({ tema: plantilla.temas })
// }

// buscarEjercicioPlantilla Busca todas las ejercicios en la base de datos del tema de una plantilla
exports.buscarEjercicioPlantilla = async (req, res) => {
  try {
    // tomar el tema
    const plantilla = await Plantilla.findById(req.params.id)
    // si no hay datos retornar 404 not found
    if (!plantilla) {
      res.status(404).json({ msg: 'No se encontro la plantilla a buscar' })
      return
    }

    // buscar en la db
    const ejercicios = await Ejercicio.find({
      tema: plantilla.temas,
      evaluacion: 0,
      archivado: false,
    }).populate({ path: 'tema', select: 'nombre' })
    // si no hay datos retornar 404 not found
    if (!ejercicios) {
      res.status(404).json({ msg: 'No se encontraron ejercicios' })
      return
    }

    // CAMBIAR POR LOOKUP
    const nuevoEjercicio = []
    await Promise.all(
      ejercicios.map(async (ejercicio) => {
        const num = await Practica.find({ ejercicios: ejercicio._id })

        const ejer = {
          referencia: ejercicio.referencia,
          _id: ejercicio._id,
          titulo: ejercicio.titulo,
          descripcion: ejercicio.descripcion,
          dificultad: ejercicio.dificultad,
          tema: ejercicio.tema,
          asignatura: ejercicio.asignatura,
          docente: ejercicio.docente,
          archivado: ejercicio.archivado,
          usado: num.length,
        }
        // console.log(ejer.calificacion)
        // // ejercicio.calificacion = calificacionEjer
        nuevoEjercicio.push(ejer)
      })
    )

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: nuevoEjercicio,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarEjercicios Busca una ejercicio en la base de datos por id
exports.buscarEjercicioID = async (req, res) => {
  try {
    // buscar en la db
    const ejercicios = await Ejercicio.findById(req.params.id)
      .populate({ path: 'tema', select: 'nombre' })
      .populate({ path: 'asignatura', select: 'nombre' })
      .populate({ path: 'docente', select: '-contrasena' })
      .populate({ path: 'referencia' })
      .exec()

    // si no hay datos retornar 404 not found
    if (!ejercicios) {
      res.status(404).json({ msg: 'No se encontraron ejercicios' })
      return
    }

    // caso contrario retornar la lista
    res.status(200).json({
      msg: 'Busqueda realizada con exito',
      data: ejercicios,
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
