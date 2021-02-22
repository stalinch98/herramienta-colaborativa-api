const express = require('express')
const { check } = require('express-validator')

const authToken = require('../middleware/logeado')
const temaController = require('../controllers/temaController')

const router = express.Router()

router.post(
  '/',
  authToken,

  [check('nombre', 'El nombre es requerido').not().isEmpty()],
  [check('asignatura', 'La asignatura es requerida').not().isEmpty()],
  temaController.crearTema
)
router.get('/padre/:id', authToken, temaController.buscarTemasPadres)
router.get('/:id', authToken, temaController.buscarTemas)

router.put('/:id', authToken, temaController.modificarTema)

router.delete('/:id', authToken, temaController.eliminarTema)

module.exports = router
