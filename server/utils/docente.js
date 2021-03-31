const Asignatura = require('../models/Asignatura')

exports.asignaturasDocente = async (idUsuario, idAsignatura) => {
  try {
    const asignaturasEncontradas = await Asignatura.find({
      docentes: idUsuario,
    }).select('nombre')
    if (!asignaturasEncontradas) {
      return false
    }

    const filtro = asignaturasEncontradas.find((asignatura) => {
      return asignatura?.id.toString() === idAsignatura
    })

    if (filtro) {
      return true
    }
    return false
  } catch (error) {
    return false
  }
}
