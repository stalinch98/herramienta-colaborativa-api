const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://herramienta-colaborativa-api.herokuapp.com',
      },
      {
        url: 'http://localhost:1323',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./server/routes/*.js'],
}

module.exports = swaggerOptions
