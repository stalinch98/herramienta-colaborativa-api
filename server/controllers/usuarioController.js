const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const Usuario = require('../models/Usuario')

exports.crearUsuario = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
    return
  }
  try {
    const { correo, contrasena } = req.body
    const usuarioEncontrado = await Usuario.findOne({ correo })
    if (usuarioEncontrado) {
      res.status(400).json({ msg: 'correo ya utilizado' })
      return
    }

    const usuario = new Usuario(req.body)
    const salt = await bcryptjs.genSalt(10)
    usuario.contrasena = await bcryptjs.hash(contrasena, salt)

    await usuario.save((err, room) => {
      if (err) {
        res.status(400).send(err)
        return
      }
      res.status(201).json({ msg: 'usuario ingresado con exito', id: room.id })
    })
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error en el servidor' })
  }
}
