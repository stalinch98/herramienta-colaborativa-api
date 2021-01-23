// fechaMayor Toma 2 fecha una de inicio y otra de fin y compara si la de inicio es mayor retorna verdadero
exports.fechaMayor = (inicio, fin) => {
  const f1 = new Date(inicio)
  const f2 = new Date(fin)
  return f1 > f2 ? true : null
}
