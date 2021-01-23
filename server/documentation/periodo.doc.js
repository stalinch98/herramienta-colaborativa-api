/* Documentacion de Periodos */
/**
 * @swagger
 * tags:
 *  name: Periodos
 *  description: Manejo de los periodos academicos en el sistema
 * /api/periodo:
 *  post:
 *      description: Insertar una nueva carrera en el sistema
 *      tags: [Periodos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          periodo:
 *                              type: int
 *                              default: 59
 *                          fechainicio:
 *                              type: date
 *                              default: 10/20/2021
 *                          fechafin:
 *                              type: date
 *                              default: 10/20/2022
 *      responses:
 *          201:
 *              description: Periodo ingresada con exito
 *          400:
 *              description: Datos requeridos / El Periodo ya existe / La fecha de fin no puede ser menor a la de inicio / Error al insertar en la base de datos
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/periodo:
 *  get:
 *      description: Obtener todas las carreras de la base de datos
 *      tags: [Periodos]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron peridos
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/periodo/{id}:
 *  put:
 *      description: Modificar un periodo por id
 *      tags: [Periodos]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Periodo
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          carrera:
 *                              type: int
 *                              default: 59
 *                          fechainicio:
 *                              type: date
 *                              default: 10/20/2021
 *                          fechafin:
 *                              type: date
 *                              default: 10/20/2022
 *      responses:
 *          200:
 *              description: Periodo modificado con exito
 *          400:
 *              description: La fecha de inicio no puede ser mayor a la de fin / La fecha de fin no puede ser menor a la de inicio
 *          404:
 *              description: Periodo ha modificar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/periodo/{id}:
 *  delete:
 *      description: eliminar un periodo por id
 *      tags: [Periodos]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Periodo
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Periodo eliminada con exito
 *          404:
 *              description: Periodo a eliminar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/periodo/{id}:
 *  patch:
 *      description: Activar un periodo por el id a su vez desactiva otro periodo activo
 *      tags: [Periodos]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Periodo
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Periodo activado con exito
 *          404:
 *              description: Periodo ha activar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */
