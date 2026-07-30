import { Router } from "express";
import authRouter from "./auth.router.js";
import notesRouter from "./notes.router.js";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOpt = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Sticky Notes API",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        token: {
          type: "apiKey",
          in: "header",
          name: "Authorization",
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(swaggerOpt);

const router = Router();

// console.log(swaggerSpec);
router.get("/", (req, res) => {
  res.json({
    message: "Sticky Notes API",
  });
});

router.use("/auth", authRouter);
router.use("/notes", notesRouter);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default router;
