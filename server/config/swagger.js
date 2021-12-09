const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.1',
    info: {
      title: 'Swagger',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'https://quicklab-api.grupoia.ec',
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
  apis: ['./server/documentation/*.js'],
}

module.exports = swaggerOptions
