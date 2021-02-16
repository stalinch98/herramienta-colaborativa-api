/* Documentacion de Usuarios */
/**
 * @swagger
 * tags:
 *  name: Usuarios
 *  description: Manejo de usuarios en el sistema
 * /api/usuarios:
 *  post:
 *      description: Insertar un nuevo usuario
 *      tags: [Usuarios]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          nombre:
 *                              type: string
 *                              default: Jefferson
 *                          apellido:
 *                              type: string
 *                              default: Diaz
 *                          contrasena:
 *                              type: string
 *                              default: password
 *                          correo:
 *                              type: string
 *                              default: jeff@gmail.com
 *                          rol:
 *                              type: string
 *                              default: docente
 *      responses:
 *          201:
 *              description: usuario ingresado con exito
 *          400:
 *              description: correo ya utilizado / ingrese un correo valido / nombre, apellido, contraseña, correo es obligatorio
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/usuarios:
 *  get:
 *      description: Obtener todos los usuarios de la base de datos
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: busqueda realizada con exito
 *          400:
 *              description: No se encontraron usuarios
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/usuarios/docente:
 *  get:
 *      description: Obtener todos los usuarios docentes de la base de datos
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: busqueda realizada con exito
 *          400:
 *              description: No se encontraron usuarios
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/usuarios/perfil:
 *  get:
 *      description: Obtener el perfil del usuario logeado por el token
 *      tags: [Usuarios]
 *      responses:
 *          200:
 *              description: busqueda realizada con exito
 *          400:
 *              description: No se encontro el usuario
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *  get:
 *      description: Obtener los datos de un usuario por el id
 *      tags: [Usuarios]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Usuario
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: busqueda realizada con exito
 *          400:
 *              description: No se encontro el usuario
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *  put:
 *      description: Modificar un usuario por id, para poder modificar un usuario tiene que tener el rol de administrador o ser el usuario logeado para modificar sus propios datos
 *      tags: [Usuarios]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Usuario
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
 *                          nombre:
 *                              type: string
 *                              default: Jefferson
 *      responses:
 *          200:
 *              description: usuario modificado con exito
 *          401:
 *              description: Permisos insuficientes para editar el usuario
 *          404:
 *              description: Usuario no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *  delete:
 *      description: Eliminar un usuario por id
 *      tags: [Usuarios]
 *      parameters:
 *        - name: id
 *          in: path
 *          description: ID Usuario
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *          200:
 *              description: usuario eliminado con exito
 *          401:
 *              description: Permisos insuficientes para eliminar el usuario
 *          404:
 *              description: Usuario no encontrado
 *          500:
 *              description: hubo un error en el servidor
 */
