/* Documentacion de Referencias */
/**
 * @swagger
 * tags:
 *  name: Referencias
 *  description: Manejo de las referencias en el sistema
 * /api/referencia:
 *  post:
 *      description: Insertar un nuevo referencia en el sistema
 *      tags: [Referencias]
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
 *                          referencia:
 *                              type: string
 *                              default: referencia
 *      responses:
 *          201:
 *              description: Referencia ingresada con exito
 *          400:
 *              description: Datos requeridos / La referencia ya existe / Error al insertar en la base de datos
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/referencia:
 *  get:
 *      description: Obtener todas las referencias de la base de datos
 *      tags: [Referencias]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron referencias
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/referencia/{id}:
 *  put:
 *      description: Modificar un referencia por id
 *      tags: [Referencias]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Referencia
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
 *                          referencia:
 *                              type: string
 *                              default: referencia
 *      responses:
 *          200:
 *              description: Referencia modificado con exito
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          404:
 *              description: Referencia ha modificar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/referencia/{id}:
 *  delete:
 *      description: eliminar un referencia por id
 *      tags: [Referencias]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Referencia
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Referencia eliminado con exito
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          404:
 *              description: Referencia a eliminar no encontrada
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/referencia/asignatura/{id}:
 *  get:
 *      description: Obtener las referencias de una asignatura
 *      tags: [Referencias]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Referencia
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron referencias
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */
