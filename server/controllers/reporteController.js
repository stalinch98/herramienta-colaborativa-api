const Ejercicio = require('../models/Ejercicio')
const Calificacion = require('../models/Calificacion')
const Practica = require('../models/Practica')
// CalificacionEjercicios reporte de las calificaciones de los ejercicios del usuario logeado por asignatura
exports.CalificacionEjercicios = async (req, res) => {
  try {
    // buscar en la db
    const ejercicios = await Ejercicio.find({
      asignatura: req.params.id,
      docente: req.logueado.id,
    })

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
          _id: ejercicio._id,
          titulo: ejercicio.titulo,
          dificultad: ejercicio.dificultad,
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

// CalificacionEjercicios reporte de las calificaciones de los ejercicios del usuario logeado por asignatura
exports.EjerciciosUsados = async (req, res) => {
  try {
    // buscar en la db
    const ejercicios = await Ejercicio.find({
      asignatura: req.params.id,
      docente: req.logueado.id,
    })

    // si no hay datos retornar 404 not found
    if (!ejercicios) {
      res.status(404).json({ msg: 'No se encontraron ejercicios' })
      return
    }

    // CAMBIAR POR LOOKUP
    const nuevoEjercicio = []
    await Promise.all(
      ejercicios.map(async (ejercicio) => {
        const num = await Practica.find({
          ejercicios: ejercicio._id,
        })
          .select(['plantilla', 'periodo', 'creado'])
          .populate({
            path: 'plantilla',
            select: 'titulo',
          })

        const ejer = {
          _id: ejercicio._id,
          titulo: ejercicio.titulo,
          dificultad: ejercicio.dificultad,
          evaluacion: ejercicio.evaluacion,
          archivado: ejercicio.archivado,
          usado: num,
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
