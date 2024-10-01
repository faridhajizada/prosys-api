const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "School API",
    version: "1.0.0",
    description: "API documentation for managing students, lessons, and exams",
  },
  servers: [
    {
      url: "http://localhost:3009/",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js", "./controllers/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };
