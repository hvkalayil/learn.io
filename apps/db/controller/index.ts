import { Router } from "@oak/oak";
import { setupSwagger } from "./swagger.ts";

const router = new Router();

setupSwagger(router);

/**
 * @openapi
 * /health:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get("/health", (context) => {
  context.response.body = { health: "OK" };
});

export default router;
