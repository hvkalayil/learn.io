import { Router } from "@oak/oak";
import { homeController } from "../../controller/v1/home.controller.ts";
import { optionalAuth } from "../../middleware/auth.ts";

const homeRouter = new Router();

homeRouter.get("/", optionalAuth, homeController.home);

export default homeRouter;
