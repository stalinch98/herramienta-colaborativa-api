const express = require('express')
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuarioController')

const router = express.Router()

router.get('/', (req, res) => {
  res.json('hello')
})

router.post(
  '/',
  [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('apellido', 'el nombre es obligatorio').not().isEmpty(),
    check('contrasena', 'la contraseña es obligatorio').not().isEmpty(),
    check('correo', 'ingrese un correo valido').isEmail(),
  ],
  usuarioController.crearUsuario
)

router.put('/', (req, res) => {
  res.json('put')
})

router.delete('/', (req, res) => {
  res.json('delete')
})

module.exports = router
