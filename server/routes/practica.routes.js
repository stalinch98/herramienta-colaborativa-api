const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const practicaController = require('../controllers/practicaController')

const router = express.Router()

router.post(
  '/',
  authToken,
  [check('plantilla', 'La plantilla es requerida').not().isEmpty()],
  [check('ejercicios', 'Los ejercicios son requeridos').not().isEmpty()],
  practicaController.crearPractica
)

router.get('/', authToken, practicaController.buscarPracticas)
router.get(
  '/asignatura',
  authToken,
  practicaController.buscarPracticaAsignatura
)

router.get('/pdf/:id/:tipo', practicaController.PDFPractica)

router.get('/:id', authToken, practicaController.buscarPracticaID)

router.put('/:id', authToken, practicaController.modificarPractica)

router.delete('/:id', authToken, practicaController.eliminarPractica)

module.exports = router
