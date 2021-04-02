const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const ejercicioController = require('../controllers/ejercicioController')

const router = express.Router()

router.post(
  '/',
  authToken,
  [check('titulo', 'El título es requerido').not().isEmpty()],
  [check('descripcion', 'La descripcion es requerida').not().isEmpty()],
  [check('dificultad', 'La dificultad es requerida').not().isEmpty()],
  [check('ejercicio', 'El ejercicio es requerido').not().isEmpty()],
  [check('tema', 'el tema es requerido').not().isEmpty()],
  [check('asignatura', 'La asignatura es requerida').not().isEmpty()],
  ejercicioController.crearEjercicio
)

router.get('/', authToken, ejercicioController.buscarEjercicios)
router.get(
  '/asignatura/:id',
  authToken,
  ejercicioController.buscarEjercicioAsignatura
)

router.get(
  '/plantilla/:id',
  authToken,
  ejercicioController.buscarEjercicioPlantilla
)
router.get('/:id', authToken, ejercicioController.buscarEjercicioID)

router.put('/:id', authToken, ejercicioController.modificarEjercicio)

router.delete('/:id', authToken, ejercicioController.eliminarEjercicio)

module.exports = router
