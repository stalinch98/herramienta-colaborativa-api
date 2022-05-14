const express = require('express')
const {check} = require('express-validator')

const authToken = require('../middleware/logeado')
const comentarioController = require('../controllers/comentarioController')

const router = express.Router()

router.post(
    '/',
    authToken,

    [check('comentario', 'El comentario es requerido').not().isEmpty()],
    [check('ejercicio', 'El ejercicio es requerido').not().isEmpty()],
    comentarioController.crearComentario
)

router.get(
    '/ejercicio/:id',
    authToken,
    comentarioController.buscarComentarioEjercicio
)
router.get(
    '/:ejercicio',
    authToken,
    comentarioController.buscarComentarioEjer
)
router.put('/:id', authToken, comentarioController.modificarComentario)

router.delete('/:id', authToken, comentarioController.eliminarComentario)

module.exports = router
