/* Documentacion de Temas */
/**
 * @swagger
 * tags:
 *  name: Temas
 *  description: Manejo de los temas en el sistema
 * /api/tema:
 *  post:
 *      description: Insertar un nuevo tema en el sistema
 *      tags: [Temas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          asignatura:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          nombre:
 *                              type: string
 *                              default: nginx
 *                          padre:
 *                              type: string
 *                              default: 6020b2001a31a21078d4934e
 *      responses:
 *          201:
 *              description: Tema ingresada con exito
 *          400:
 *              description: Datos requeridos / El tema con ese nombre ya existe / Error al insertar en la base de datos
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/tema:
 *  get:
 *      description: Obtener todos los temas de la base de datos
 *      tags: [Temas]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron temas
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/tema/{id}:
 *  put:
 *      description: Modificar un tema por id
 *      tags: [Temas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Tema
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
 *                          asignatura:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          nombre:
 *                              type: string
 *                              default: nginx
 *                          padre:
 *                              type: string
 *                              default: 6020b2001a31a21078d4934e
 *      responses:
 *          200:
 *              description: Tema modificado con exito
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          404:
 *              description: Tema ha modificar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/tema/{id}:
 *  delete:
 *      description: eliminar un tema por id
 *      tags: [Temas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Tema
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Tema eliminado con exito
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          404:
 *              description: Tema a eliminar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/tema/padre:
 *  get:
 *      description: Obtener todos los temas padres de la base de datos
 *      tags: [Temas]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron temas
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */
