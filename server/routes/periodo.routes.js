const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const administrador = require('../middleware/administrador')
const periodoController = require('../controllers/periodoController')

const router = express.Router()

router.post(
  '/',
  authToken,
  administrador,
  [
    check('periodo', 'El periodo es requerido').not().isEmpty(),
    check('fechainicio', 'La fecha de inicio es requerida').not().isEmpty(),
    check('fechafin', 'La fecha de fin es requerida').not().isEmpty(),
  ],
  periodoController.crearPeriodo
)

router.put('/:id', authToken, administrador, periodoController.modificarPeriodo)

router.delete(
  '/:id',
  authToken,
  administrador,
  periodoController.eliminarPeriodo
)

router.get('/', authToken, periodoController.buscarPeriodo)
router.patch('/:id', authToken, administrador, periodoController.activarPeriodo)

module.exports = router
