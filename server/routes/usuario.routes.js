const express = require('express')
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuarioController')
const auth = require('../middleware/logeado')

const router = express.Router()

router.post(
  '/',

  [
    check('nombre', 'el nombre es obligatorio').not().isEmpty(),
    check('apellido', 'el apellido es obligatorio').not().isEmpty(),
    check('contrasena', 'la contraseña es obligatorio').not().isEmpty(),
    check('correo', 'el correo es obligatorio').not().isEmpty(),
    check('correo', 'ingrese un correo valido').isEmail(),
  ],
  usuarioController.crearUsuario
)

router.get('/perfil', auth, usuarioController.perfilUsuario)
router.get('/docente', auth, usuarioController.buscarDocentes)

router.get('/', auth, usuarioController.buscarUsuarios)

router.get('/:id', auth, usuarioController.buscarUsuario)

router.put('/:id', auth, usuarioController.modificarUsuario)

router.delete('/:id', auth, usuarioController.eliminarUsuario)

module.exports = router
