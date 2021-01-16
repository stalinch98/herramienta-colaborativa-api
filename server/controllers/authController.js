const bcryptjs = require('bcryptjs')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const Usuario = require('../models/Usuario')

exports.autenticarUsuario = async (req, res) => {
  const errs = validationResult(req)
  if (!errs.isEmpty()) {
    res.status(400).json({ errores: errs.array() })
  }

  const { correo, contrasena } = req.body
  try {
    const usuarioEncontrado = await Usuario.findOne({ correo })
    if (!usuarioEncontrado) {
      res.status(400).json({ msg: 'usuario no existe' })
      return
    }

    const contracorrecta = await bcryptjs.compare(
      contrasena,
      usuarioEncontrado.contrasena
    )
    if (!contracorrecta) {
      res.status(400).json({ msg: 'contraseña incorrecta' })
      return
    }

    const payload = {
      usuario: {
        id: usuarioEncontrado.id,
        nombre: usuarioEncontrado.nombre,
        apellido: usuarioEncontrado.apellido,
        correo: usuarioEncontrado.correo,
        rol: usuarioEncontrado.rol,
      },
    }
    jwt.sign(
      payload,
      process.env.TOKEN,
      {
        expiresIn: 36000000,
      },
      (error, token) => {
        if (error) throw error
        res.status(200).json({ msg: 'login exitoso', token })
      }
    )
  } catch (error) {
    res.status(500).json({ msg: 'hubo un error' })
  }
}
