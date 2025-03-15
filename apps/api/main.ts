import { Application } from "@oak/oak";
import apiV1 from "./controller/v1/index.ts";
import { PORT } from "./config.ts";
import { logger } from "./middleware/logger.ts";

const app = new Application();

app.use(logger);
app.use(apiV1.routes());

try {
  console.info(`Starting server on port ${PORT}`);
  await app.listen({ port: Number(PORT) });
} catch (error) {
  console.error(`Failed to start server: ${error}`);
}
