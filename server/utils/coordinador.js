const Asignatura = require('../models/Asignatura')
const Plantilla = require('../models/Plantilla')

exports.asignaturasCoordinador = async (idUsuario, idAsignatura) => {
  try {
    const asignaturasEncontradas = await Asignatura.find({
      coordinador: idUsuario,
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

exports.practicaCoordinador = async (idPlantilla) => {
  try {
    const plantillaEncontradas = await Plantilla.findById(idPlantilla).select(
      'asignatura'
    )

    if (!plantillaEncontradas) {
      return null
    }

    // eslint-disable-next-line no-underscore-dangle
    const idAsignatura = plantillaEncontradas.asignatura._id
    return idAsignatura
  } catch (error) {
    return null
  }
}
