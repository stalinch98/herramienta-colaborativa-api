const { validationResult } = require('express-validator')
const Periodo = require('../models/Periodo')
const Practica = require('../models/Practica')

const { fechaMayor } = require('../utils/functions')

// crearPeriodo ingresa una periodo en la base de datos
exports.crearPeriodo = async (req, res) => {
  // Validar errores de express-validator
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }

  try {
    // revisar si ya existe
    const { periodo, fechainicio, fechafin } = req.body
    const periodoEncontrado = await Periodo.findOne({ periodo })
    if (periodoEncontrado) {
      res.status(400).json({ msg: 'El Periodo ya existe' })
      return
    }

    // Validar si la fecha de fin es mayor a la de inicio
    const validarFechas = fechaMayor(fechainicio, fechafin)

    if (validarFechas) {
      res
        .status(400)
        .send({ msg: 'La fecha de fin no puede ser menor a la de inicio' })
      return
    }

    // crear el modelo con los datos del Request body
    const periodoModel = new Periodo(req.body)

    // Guardar en la base de datos
    await periodoModel.save((err, room) => {
      if (err) {
        res.status(400).send({ msg: 'Error al insertar en la base de datos' })
        return
      }
      res.status(201).json({ msg: 'Periodo ingresada con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// buscarPeriodo Busca todos periodos en la base de datos
exports.buscarPeriodo = async (_req, res) => {
  try {
    // buscar en la db
    const carreras = await Periodo.find()

    // si no hay datos retornar 404 not found
    if (!carreras) {
      res.status(404).json({ msg: 'No se encontraron peridos' })
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

// modificarPeriodo modifica un periodo en la db buscandola por id
exports.modificarPeriodo = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    let periodoEncontrado = await Periodo.findById(req.params.id)
    if (!periodoEncontrado) {
      res.status(404).json({ msg: 'Periodo ha modificar no encontrado' })
      return
    }

    // Almacenar los campos enviados por request body en una variable
    const { periodo, fechainicio, fechafin } = req.body
    const nuevosDatos = {}

    if (periodo) {
      nuevosDatos.periodo = periodo
    }
    if (fechainicio) {
      nuevosDatos.fechainicio = fechainicio

      // Validar si la fecha de inicio es mayor a la de fin
      if (fechaMayor(fechainicio, fechafin || periodoEncontrado.fechafin)) {
        res
          .status(400)
          .send({ msg: 'La fecha de inicio no puede ser mayor a la de fin' })
        return
      }
    }

    if (fechafin) {
      nuevosDatos.fechafin = fechafin

      // Validar si la fecha de fin es menor a la de inicio
      if (fechaMayor(fechainicio || periodoEncontrado.fechainicio, fechafin)) {
        res
          .status(400)
          .send({ msg: 'La fecha de fin no puede ser menor a la de inicio' })
        return
      }
    }
    // Modificar en la db
    periodoEncontrado = await Periodo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: nuevosDatos },
      { new: true }
    )

    res
      .status(200)
      .json({ msg: 'Periodo modificado con exito', data: periodoEncontrado })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// eliminarPeriodo Elimina un periodo por el id
exports.eliminarPeriodo = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    const periodoEncontrado = await Periodo.findById(req.params.id)
    if (!periodoEncontrado) {
      res.status(404).json({ msg: 'Periodo a eliminar no encontrado' })
      return
    }

    const TienePracticasAsignadas = await Practica.find({
      periodo: req.params.id,
    })
    if (TienePracticasAsignadas.length !== 0) {
      res.status(404).json({ msg: 'Existen practicas con este periodo' })
      return
    }

    // Eliminar en la db
    await Periodo.findOneAndRemove({ _id: req.params.id })
    res.status(200).json({ msg: 'Periodo eliminada con exito' })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}

// modificarPeriodo modifica un periodo en la db buscandola por id
exports.activarPeriodo = async (req, res) => {
  try {
    // Revisar si existe por el id enviado
    let periodoEncontrado = await Periodo.findById(req.params.id)
    if (!periodoEncontrado) {
      res.status(404).json({ msg: 'Periodo ha activar no encontrado' })
      return
    }

    //  Desactivar actual
    periodoEncontrado = await Periodo.updateMany(
      { estado: true },
      { $set: { estado: false } },
      { new: true }
    )
    // Modificar en la db
    periodoEncontrado = await Periodo.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { estado: true } },
      { new: true }
    )

    res
      .status(200)
      .json({ msg: 'Periodo activado con exito', data: periodoEncontrado })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
