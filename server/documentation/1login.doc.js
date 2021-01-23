/**
 * @swagger
 * tags:
 *  name: Login
 *  description: Endpoint para inicio de sesion
 * /api/login:
 *  post:
 *      tags: [Login]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          correo:
 *                              type: string
 *                              default: jeffy@gmail.com
 *                          contrasena:
 *                              type: string
 *      responses:
 *          200:
 *              description: login exitoso
 *          400:
 *              description: usuario no existe / contraseña incorrecta / contraseña, correo es obligatorio
 *          500:
 *              description: hubo un error en el servidor
 */
