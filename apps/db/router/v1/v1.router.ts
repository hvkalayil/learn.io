import { Router } from "@oak/oak";
import { setupSwagger } from "./docs/swagger.ts";
import { authMiddleware } from "../../middleware/auth.ts";
import { v1Controller } from "../../controller/v1/v1.controller.ts";

const v1Router = new Router({ prefix: "/v1" });

setupSwagger(v1Router);

v1Router.get("/health", authMiddleware, v1Controller.health);
v1Router.get("/create", authMiddleware, v1Controller.create);
v1Router.get("/seed", authMiddleware, v1Controller.seed);
v1Router.get("/migrate", authMiddleware, v1Controller.migrate);

export default v1Router;
