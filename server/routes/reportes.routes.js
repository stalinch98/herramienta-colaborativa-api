const express = require('express')
const authToken = require('../middleware/logeado')
const reporteController = require('../controllers/reporteController')

const router = express.Router()

router.get(
  '/calificacion/:id',
  authToken,
  reporteController.CalificacionEjercicios
)

router.get('/usado/:id', authToken, reporteController.EjerciciosUsados)

module.exports = router
