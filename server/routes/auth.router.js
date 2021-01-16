const express = require('express')
const { check } = require('express-validator')
const authController = require('../controllers/authController')

const router = express.Router()

router.post(
  '/',
  [
    check('contrasena', 'Ingrese una contraseña').not().isEmpty(),
    check('correo', 'Ingrese un correo').not().isEmpty(),
  ],
  authController.autenticarUsuario
)

module.exports = router
