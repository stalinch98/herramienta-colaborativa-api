const express = require('express')
const { check } = require('express-validator')
const authController = require('../controllers/authController')

const router = express.Router()

router.post(
  '/',
  [
    check('contrasena', 'la contraseña es obligatorio').not().isEmpty(),
    check('correo', 'el correo es obligatorio').not().isEmpty(),
  ],
  authController.autenticarUsuario
)

module.exports = router
