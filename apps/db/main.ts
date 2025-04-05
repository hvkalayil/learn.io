import { Application, Router } from "@oak/oak";
import apiRoutes from "./controller/index.ts";
import { HOST, PORT } from "./config.ts";
import { logger } from "./middleware/logger.ts";

const app = new Application();
const router = new Router();

app.use(logger);
app.use(apiRoutes.routes());

router.get("/", (context) => {
  context.response.redirect("/docs");
});
app.use(router.routes());
app.use(router.allowedMethods());

try {
  console.info("\x1b[42m\x1b[37m 🧰 DB tools ready \x1b[0m");
  console.info(`\t\x1b[1mLocal:\x1b[0m ${HOST}:${PORT}`);
  await app.listen({ port: Number(PORT) });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
}
