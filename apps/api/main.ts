import { Application, Router } from "@oak/oak";
import { HOST, PORT } from "./config.ts";
import { logger } from "./middleware/logger.ts";
import v1Router from "./router/v1/v1.router.ts";

const app = new Application();
const router = new Router();

app.use(logger);
app.use(v1Router.routes());

router.get("/", (context) => {
  context.response.redirect("/v1/docs");
});
app.use(router.routes());
app.use(router.allowedMethods());

try {
  console.info("\x1b[42m\x1b[37m 🐦‍🔥 API ready \x1b[0m");
  console.info(`\t\x1b[1mLocal:\x1b[0m ${HOST}:${PORT}`);
  await app.listen({ port: Number(PORT) });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
}
