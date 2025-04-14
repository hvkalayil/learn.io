import { Router } from "@oak/oak";
import { homeController } from "../../controller/v1/home.controller.ts";

const homeRouter = new Router();

homeRouter.get("/", homeController.home);

export default homeRouter;
