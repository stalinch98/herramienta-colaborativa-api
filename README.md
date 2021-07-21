# Proyecto API
 
Este proyecto es el backend del Proyecto técnico para crear una herramienta colaborativa en Internet que permita gestionar las prácticas de laboratorio del claustro docente de la Universidad Politécnica Salesiana. 
 
También puede revisar la parte visual en el repositorio: [ Herramienta colaborativa ](https://github.com/jeffqev/herramienta-colaborativa)
 
Si se desea entender mejor como fue contruido el proyecto, cada modulo realizado cuenta con su tarjeta en el [ tablero kanban ](https://github.com/jeffqev/herramienta-colaborativa-api/projects/1) cada tarjeta esta asociada a un pull request donde esta descrito lo que se hace y el codigo que fue modificado
## Pre requisitos para levantar el proyecto
 
El proyecto fue desarrollado en la versión de node v14.15.1 sin embargo se ha probado que funciona correctamente en versiones mayores a 12.0.0
 
Para que funcione correctamente es necesario tener las siguientes variables de entorno en un archivo `.env`
 
```
* DB_MONGO=mongodb://user:password@localhost/quicklab?authSource=quicklab&readPreference=primary&appname=MongoDB%20Compass&ssl=false
* TOKEN=firma-del-token
```
 
Descripción: 
* DB_MONGO: Debe contener el string de conexión de la base de datos de mongodb
* TOKEN= Debe contener la firma que se usara para el token de JWT
 
### Levantar el proyecto
 
* `npm install`
* `npm start`
 
### Desplegar el aplicativo
 
**para desplegar en un servidor se hara el mismo proceso del levantamiento y se usara la herramienta pm2 para que se quede ejecutando en background**
 
* `npm install -g pm2`
* `pm2 start server/server.js --name "quicklab-api"`

Podemos verificar si se encuentra ejecutado la aplicacion con el siguiente comando
 
* `pm2 list`
 
