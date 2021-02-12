const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const administrador = require('../middleware/administrador')
const asignaturaController = require('../controllers/asignaturaController')

const router = express.Router()

router.post(
  '/',
  authToken,
  administrador,
  [check('codigo', 'El código es requerida').not().isEmpty()],
  asignaturaController.crearAsignatura
)

router.get('/', authToken, asignaturaController.buscarAsignaturas)

router.put(
  '/:id',
  authToken,
  administrador,
  asignaturaController.modificarAsignatura
)

router.patch(
  '/docentes/:id',
  authToken,
  [check('docentes', 'Agregar almenos un docente').not().isEmpty()],
  asignaturaController.docentesAsignatura
)

router.delete(
  '/:id',
  authToken,
  administrador,
  asignaturaController.eliminarAsignatura
)

module.exports = router
