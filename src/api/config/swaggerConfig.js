const swaggerJSDoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Daily Music API",
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerDocs;
