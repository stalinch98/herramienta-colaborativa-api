/* Documentacion de Carreras */
/**
 * @swagger
 * tags:
 *  name: Carreras
 *  description: Manejo de las carreras en el sistema
 * /api/carrera:
 *  post:
 *      description: Insertar una nueva carrera en el sistema
 *      tags: [Carreras]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          carrera:
 *                              type: string
 *                              default: Ingenieria en sistemas
 *      responses:
 *          201:
 *              description: carrera ingresada con exito
 *          400:
 *              description: La carrera es requerida / La carrera con ese nombre ya existe / Error al insertar en la base de datos
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/carrera:
 *  get:
 *      description: Obtener todas las carreras de la base de datos
 *      tags: [Carreras]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron carreras
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/carrera/{id}:
 *  put:
 *      description: Modificar una carrera por id
 *      tags: [Carreras]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Carrera
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
 *                              type: string
 *                              default: Ingenieria ambiental
 *      responses:
 *          200:
 *              description: La carrera es requerida
 *          400:
 *              description: La carrera es requerida
 *          404:
 *              description: Carrera ha modificar no encontrada
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/carrera/{id}:
 *  delete:
 *      description: eliminar una carrera por id
 *      tags: [Carreras]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Carrera
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Carrera eliminada con exito
 *          404:
 *              description: Carrera a eliminar no encontrada
 *          500:
 *              description: hubo un error en el servidor
 */
