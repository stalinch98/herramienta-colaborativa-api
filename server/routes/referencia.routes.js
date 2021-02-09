const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const referenciaController = require('../controllers/referenciaController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('referencia', 'La referencia es requerida').not().isEmpty()],
  [check('asignatura', 'La asignatura es requerida').not().isEmpty()],
  referenciaController.crearReferencia
)

router.get('/', authToken, referenciaController.buscarReferencias)
router.get(
  '/asignatura/:id',
  authToken,
  referenciaController.buscarReferenciasAsignatura
)

router.put('/:id', authToken, referenciaController.modificarReferencia)

router.delete('/:id', authToken, referenciaController.eliminarReferencia)

module.exports = router
