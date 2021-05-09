/* Documentacion de Calificaciones */
/**
 * @swagger
 * tags:
 *  name: Calificaciones
 *  description: Manejo de las calificaciones de un ejercicio en el sistema
 * /api/calificacion:
 *  post:
 *      description: Insertar un nuevo calificacion en el sistema
 *      tags: [Calificaciones]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          ejercicio:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          puntaje:
 *                              type: int
 *                              default: 5
 *      responses:
 *          201:
 *              description: Calificacion ingresada con exito
 *          400:
 *              description: Datos requeridos / El docente ya califico este ejercicio / Error al insertar en la base de datos
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/calificacion/ejercicio/{id}:
 *  get:
 *      description: Obtener todas las calificaciones de un ejercicio
 *      tags: [Calificaciones]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Ejercicio
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron calificaciones
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/calificacion/{ejercicio}:
 *  get:
 *      description: Obtener la calificacion del usuario logueado a un ejercicio
 *      tags: [Calificaciones]
 *      parameters:
 *        - name: ejercicio
 *          in: path
 *          description: ID Ejercicio
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron calificaciones
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/calificacion/{id}:
 *  put:
 *      description: Modificar un calificacion por id
 *      tags: [Calificaciones]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Calificacion
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
 *                          puntaje:
 *                              type: int
 *                              default: 4
 *      responses:
 *          200:
 *              description: Calificacion modificado con exito
 *          404:
 *              description: Calificacion ha modificar no encontrada
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/calificacion/{id}:
 *  delete:
 *      description: eliminar un calificacion por id
 *      tags: [Calificaciones]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Calificacion
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Calificacion eliminado con exito
 *          404:
 *              description: Calificacion a eliminar no encontrada
 *          500:
 *              description: hubo un error en el servidor
 */
