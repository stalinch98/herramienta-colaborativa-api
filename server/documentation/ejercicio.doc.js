/* Documentacion de Ejercicios */
/**
 * @swagger
 * tags:
 *  name: Ejercicios
 *  description: Manejo de las ejercicios para generar una practica
 * /api/ejercicio:
 *  post:
 *      description: Insertar un nuevo ejercicio en el sistema
 *      tags: [Ejercicios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          titulo:
 *                              type: string
 *                              default: Condicion if
 *                          dificultad:
 *                              type: int
 *                              default: 3
 *                          ejercicio:
 *                              type: string
 *                              default: <h1>Ejercicio</h1>
 *                          tema:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *                          asignatura:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *      responses:
 *          201:
 *              description: Ejercicio ingresada con exito
 *          400:
 *              description: Datos requeridos / Error al insertar en la base de datos / El ejercicio con ese título ya existe / Error al insertar en la base de datos
 *          401:
 *              description: Permisos insuficientes para realizar la accion no es coordinador o docente de la asignatura
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/ejercicio:
 *  get:
 *      description: Obtener todas las ejercicios de la db
 *      tags: [Ejercicios]
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron ejercicios
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/ejercicio/asignatura/{id}:
 *  get:
 *      description: Obtener todas las ejercicios de una asignatura
 *      tags: [Ejercicios]
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
 *              description: No se encontraron ejercicios
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/ejercicio/plantilla/{id}:
 *  get:
 *      description: Obtener todas las ejercicios de una plantilla
 *      tags: [Ejercicios]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Plantilla
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Busqueda realizada con exito
 *          404:
 *              description: No se encontraron ejercicios
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/ejercicio/{id}:
 *  get:
 *      description: Obtener los datos de una ejercicio por su id
 *      tags: [Ejercicios]
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
 *              description: No se encontraron ejercicios
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/ejercicio/{id}:
 *  put:
 *      description: Modificar un ejercicio por id
 *      tags: [Ejercicios]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Ejercicio
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
 *              description: Ejercicio modificado con exito
 *          404:
 *              description: Ejercicio ha modificar no encontrado
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/ejercicio/{id}:
 *  delete:
 *      description: eliminar un ejercicio por id
 *      tags: [Ejercicios]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Ejercicio
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Ejercicio eliminado con exito
 *          404:
 *              description: Ejercicio a eliminar no encontrado
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */
