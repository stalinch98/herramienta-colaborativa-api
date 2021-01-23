module.exports = (req, res, next) => {
  const { rol } = req.logueado

  if (rol !== 'administrador') {
    res
      .status(401)
      .json({ msg: 'Permisos insuficientes para realizar la accion' })
    return
  }
  next()
}
