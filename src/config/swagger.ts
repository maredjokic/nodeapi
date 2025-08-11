import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Webshop API",
      version: "1.0.0",
      description: "API dokumentacija za webshop projekt"
    },
    servers: [
      {
        url: "http://localhost:5000"
      }
    ]
  },
  apis: ["./src/routes/*.ts"], // fajlovi gde pišeš Swagger komentare
};

export const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express, port: number) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log(`📄 Swagger dostupan na http://localhost:${port}/api-docs`);
};
