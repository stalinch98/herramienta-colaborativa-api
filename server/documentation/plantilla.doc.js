/* Documentacion de Plantillas */
/**
 * @swagger
 * tags:
 *  name: Plantillas
 *  description: Manejo de las plantillas para generar una practica
 * /api/plantilla:
 *  post:
 *      description: Insertar un nuevo plantilla en el sistema
 *      tags: [Plantillas]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          titulo:
 *                              type: string
 *                              default: Condicionales
 *                          asignatura:
 *                              type: string
 *                              default: 60163b1352b5961950dc2720
 *      responses:
 *          201:
 *              description: Plantilla ingresada con exito
 *          400:
 *              description: Datos requeridos / Error al insertar en la base de datos / La plantilla con ese título ya existe / Error al insertar en la base de datos
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/plantilla:
 *  get:
 *      description: Obtener todas las plantillas del usuario coordinador logueado
 *      tags: [Plantillas]
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
 *              description: No se encontraron plantillas
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/plantilla/asignatura/{id}:
 *  get:
 *      description: Obtener todas las plantillas de una asignatura
 *      tags: [Plantillas]
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
 *              description: No se encontraron plantillas
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/plantilla/{id}:
 *  get:
 *      description: Obtener los datos de una plantilla por su id
 *      tags: [Plantillas]
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
 *              description: No se encontraron plantillas
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/plantilla/{id}:
 *  put:
 *      description: Modificar un plantilla por id
 *      tags: [Plantillas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Plantilla
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
 *              description: Plantilla modificado con exito
 *          404:
 *              description: Plantilla ha modificar no encontrada
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/plantilla/{id}:
 *  delete:
 *      description: eliminar un plantilla por id
 *      tags: [Plantillas]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Plantilla
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: Plantilla eliminado con exito
 *          404:
 *              description: Plantilla a eliminar no encontrada
 *          401:
 *              description: Permisos insuficientes para realizar la accion
 *          500:
 *              description: hubo un error en el servidor
 */
