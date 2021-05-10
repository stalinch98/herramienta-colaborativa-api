/* Documentacion de Practicas */
/**
 * @swagger
 * tags:
 *  name: Practicas
 *  description: Manejo de las practicas en el sistema
 * /api/practica:
 *  post:
 *      description: Insertar un nuevo practica en el sistema
 *      tags: [Practicas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          plantilla:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          practicas:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *      responses:
 *          201:
 *              description: Practica ingresada con exito
 *          400:
 *              description: Datos requeridos / Error al insertar en la base de datos / El practica con ese título ya existe / Error al insertar en la base de datos
 *          404:
 *              description: No existe un periodo activo comunicare con un administrador
 *          401:
 *              description: Permisos insuficientes para realizar la accion no es coordinador o docente de la asignatura
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/practica:
 *  get:
 *      description: Obtener todas las practicas de la db
 *      tags: [Practicas]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron practicas
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/practica/asignatura:
 *  get:
 *      description: Obtener todas las practicas de una asignatura
 *      tags: [Practicas]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron practicas
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/practica/{id}:
 *  get:
 *      description: Obtener los datos de una practica por su id
 *      tags: [Practicas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Practica
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron practicas
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/practica/{id}:
 *  put:
 *      description: Modificar un practica por id
 *      tags: [Practicas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Practica
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
 *                          titulo:
 *                              type: string
 *                              default: Nuevo titulo
 *      responses:
 *          200:
 *              description: Practica modificado con exito
 *          404:
 *              description: Practica ha modificar no encontrado
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/practica/{id}:
 *  delete:
 *      description: eliminar un practica por id
 *      tags: [Practicas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Practica
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Practica eliminado con exito
 *          404:
 *              description: Practica a eliminar no encontrado
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/practica/pdf/{id}/{tipo}:
 *  get:
 *      description: Obtener el archivo pdf de una practica con o sin soluciones
 *      tags: [Practicas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Practica
 *          required: true
 *          schema:
 *            type: string
 *        - name: tipo
 *          in: path
 *          description: tipo [normal / solucion]
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: PDF
 *          404:
 *              description: No hay datos para enviar en el pdf
 *          500:
 *              description: hubo un error en el servidor
 */
