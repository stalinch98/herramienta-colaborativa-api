const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const administrador = require('../middleware/administrador')
const carreraController = require('../controllers/carreraController')

const router = express.Router()

router.post(
  '/',
  authToken,
  administrador,
  [check('carrera', 'La carrera es requerida').not().isEmpty()],
  carreraController.crearCarrera
)

router.put(
  '/:id',
  authToken,
  administrador,
  [check('carrera', 'La carrera es requerida').not().isEmpty()],
  carreraController.modificarCarrera
)

router.delete(
  '/:id',
  authToken,
  administrador,
  carreraController.eliminarCarrera
)

router.get('/', authToken, administrador, carreraController.buscarCarreras)

module.exports = router
