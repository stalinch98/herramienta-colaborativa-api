const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const plantillaController = require('../controllers/plantillaController')

const router = express.Router()

router.post(
  '/',
  authToken,
  [check('titulo', 'El título es requerido').not().isEmpty()],
  [check('asignatura', 'La asignatura es requerida').not().isEmpty()],
  plantillaController.crearPlantilla
)

router.get('/', authToken, plantillaController.buscarPlantillas)
router.get(
  '/asignatura/:id',
  authToken,
  plantillaController.buscarPlantillaAsignatura
)
router.get('/:id', authToken, plantillaController.buscarPlantillaID)

router.put('/:id', authToken, plantillaController.modificarPlantilla)

router.delete('/:id', authToken, plantillaController.eliminarPlantilla)

module.exports = router
