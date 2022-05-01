const express = require('express')
const {check} = require('express-validator')
const recoveryController = require('../controllers/recoveryController')

const router = express.Router()

router.post(
    '/',
    [
        check('correo', 'el correo es obligatorio').not().isEmpty(),
    ],
    recoveryController.recuperarContrasena
)

module.exports = router