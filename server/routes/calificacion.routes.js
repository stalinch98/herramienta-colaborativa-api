const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const calificacionController = require('../controllers/calificacionController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('puntaje', 'El puntaje es requerido').not().isEmpty()],
  [check('ejercicio', 'El ejercicio es requerido').not().isEmpty()],
  calificacionController.crearCalificacion
)

router.get(
  '/ejercicio/:id',
  authToken,
  calificacionController.buscarCalificacionEjercicio
)
router.get(
  '/:ejercicio',
  authToken,
  calificacionController.buscarCalificacionEjer
)
router.put('/:id', authToken, calificacionController.modificarCalificacion)

router.delete('/:id', authToken, calificacionController.eliminarCalificacion)

module.exports = router
