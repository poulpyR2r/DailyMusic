const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DailyMusic API",
      version: "1.0.0",
      description: "DailyMusic API",
    },
    servers: [
      {
        url: "http://localhost:3005/api/",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        VotingSession: {
          type: "object",
          required: ["module_name", "expiration_date", "categorie"],
          properties: {
            module_name: { type: "string", exemple: "Musique des années 60" },
            expiration_date: { type: "string", format: "date-time" },
            categorie: { type: "string", exemple: "Musique française" },
            musics: {
              type: "array",
              items: {
                type: "string",
              },
            },
          },
        },
        Vote: {
          type: "object",
          required: ["user_id", "music_id", "session_id"],
          properties: {
            user_id: { type: "string", exemple: "user_id" },
            music_id: { type: "string", exemple: "music_id" },
            session_id: { type: "string", exemple: "session_id" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        User: {
          type: "object",
          required: ["name", "role", "email", "password"],
          properties: {
            name: { type: "string", exemple: "Hiren" },
            role: { type: "string", enum: ["admin", "user"] },
            email: { type: "string", exemple: "Hirenpatel@gmail.com" },
            password: { type: "string", exemple: "***********" },
            created_at: { type: "string", format: "date-time" },
          },
        },
        Music: {
          type: "object",
          required: ["title", "artist"],
          properties: {
            title: { type: "string", exemple: "La bohème" },
            artist: { type: "string", exemple: "Charles Aznavour" },
            vote_count: { type: "number", exemple: "1965" },
            created_at: { type: "string", format: "date-time" },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/api/routes/*.route.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
