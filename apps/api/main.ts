import { Application } from "@oak/oak";
import apiV1 from "./controller/v1/index.ts";
import { HOST, PORT } from "./config.ts";
import { logger } from "./middleware/logger.ts";

const app = new Application();

app.use(logger);
app.use(apiV1.routes());

try {
  console.info("\x1b[42m\x1b[37m 🐦‍🔥 API ready \x1b[0m");
  console.info(`\t\x1b[1mLocal:\x1b[0m ${HOST}:${PORT}`);
  await app.listen({ port: Number(PORT) });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
}
