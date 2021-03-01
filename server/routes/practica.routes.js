const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const practicaController = require('../controllers/practicaController')

const router = express.Router()

router.post(
  '/',
  authToken,
  [check('titulo', 'El título es requerido').not().isEmpty()],
  [check('asignatura', 'La asignatura es requerida').not().isEmpty()],
  practicaController.crearPractica
)

router.get('/', authToken, practicaController.buscarPracticas)
router.get(
  '/asignatura/:id',
  authToken,
  practicaController.buscarPracticaAsignatura
)
router.get('/:id', authToken, practicaController.buscarPracticaID)

router.put('/:id', authToken, practicaController.modificarPractica)

router.delete('/:id', authToken, practicaController.eliminarPractica)

module.exports = router
