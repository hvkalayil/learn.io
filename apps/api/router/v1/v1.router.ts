import { Router } from "@oak/oak";
import { setupSwagger } from "./docs/swagger.ts";
import { v1Controller } from "../../controller/v1/v1.controller.ts";
import homeRouter from "./home.router.ts";

const v1Router = new Router({ prefix: "/v1" });

setupSwagger(v1Router);

v1Router.get("/health", v1Controller.health);
v1Router.use("/home", homeRouter.routes(), homeRouter.allowedMethods());

export default v1Router;
