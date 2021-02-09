/* Documentacion de Asignaturas */
/**
 * @swagger
 * tags:
 *  name: Asignaturas
 *  description: Manejo de las asignaturas en el sistema
 * /api/asignatura:
 *  post:
 *      description: Insertar una nueva asignatura en el sistema
 *      tags: [Asignaturas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          codigo:
 *                              type: string
 *                              default: "1010"
 *                          nombre:
 *                              type: string
 *                              default: Sistemas operativos
 *                          carrera:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          coordinador:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          docentes:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              default: ['60163b1352b5961950dc2720','60163b1352b5961950dc2720','60163b1352b5961950dc2720']
 *      responses:
 *          201:
 *              description: Asignatura ingresada con exito
 *          400:
 *              description: Datos requeridos / La asignatura con ese codigo ya existe / Error al insertar en la base de datos
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/asignatura:
 *  get:
 *      description: Obtener todas las asignaturas de la base de datos
 *      tags: [Asignaturas]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron asignaturas
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/asignatura/{id}:
 *  put:
 *      description: Modificar una asignatura por id
 *      tags: [Asignaturas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Asignatura
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
 *                          codigo:
 *                              type: string
 *                              default: "1010"
 *                          nombre:
 *                              type: string
 *                              default: Sistemas operativos
 *                          carrera:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          coordinador:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          docentes:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              default: ['60163b1352b5961950dc2720','60163b1352b5961950dc2720','60163b1352b5961950dc2720']
 *      responses:
 *          200:
 *              description: Asignatura modificado con exito
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          404:
 *              description: Asignatura ha modificar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/asignatura/{id}:
 *  delete:
 *      description: eliminar un asignatura por id
 *      tags: [Asignaturas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Asignatura
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Asignatura eliminada con exito
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          404:
 *              description: Asignatura a eliminar no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/asignatura/docentes/{id}:
 *  patch:
 *      description: Agregar mas docentes a la asignatura sin ser usuario administrador
 *      tags: [Asignaturas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Asignatura
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
 *                          docentes:
 *                              type: array
 *                              items:
 *                                  type: string
 *                              default: ['60163b1352b5961950dc2720','60163b1352b5961950dc2720','60163b1352b5961950dc2720']

 *      responses:
 *          200:
 *              description: Asignatura modificada con exito
 *          404:
 *              description: Asignatura ha modificar no encontrada
 *          500:
 *              description: hubo un error en el servidor
 */
