const express = require('express')
const { check } = require('express-validator')
const usuarioController = require('../controllers/usuarioController')

const router = express.Router()

router.get('/', (req, res) => {
  res.json('hello')
})

/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Manejo de usuarios en el sistema
 * /api/usuarios:
 *  post:
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              default: Jefferson
 *                          apellido:
 *                              type: string
 *                              default: Diaz
 *                          contrasena:
 *                              type: string
 *                              default: password
 *                          correo:
 *                              type: string
 *                              default: jeff@gmail.com
 *                          rol:
 *                              type: string
 *                              default: docente
 *      responses:
 *          201:
 *              description: usuario ingresado con exito
 *          400:
 *              description: correo ya utilizado / ingrese un correo valido / nombre, apellido, contraseña, correo es obligatorio
 *          500:
 *              description: hubo un error en el servidor
 */
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

router.put('/', (req, res) => {
  res.json('put')
})

router.delete('/', (req, res) => {
  res.json('delete')
})

module.exports = router
