/* Documentacion de Reportes */
/**
 * @swagger
 * tags:
 *  name: Reportes
 *  description: Obtener reportes de los usuario
 * /api/reportes/calificacion/{id}:
 *  get:
 *      description: Obtener las calificaciones de los ejercicios del usuario logueado
 *      tags: [Reportes]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Asignatura
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron reportes
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/reportes/usado/{id}:
 *  get:
 *      description: Obtener el numero de usos de los ejercicios de un usuario logueado
 *      tags: [Reportes]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Asignatura
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron reportes
 *          500:
 *              description: hubo un error en el servidor
 */
