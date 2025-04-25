import { Router } from "@oak/oak";
import { authController } from "../../controller/v1/auth.controller.ts";

const authRouter = new Router();

authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);

export default authRouter;
