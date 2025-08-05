import { Router } from "@oak/oak";
import { pageController } from "../../controller/v1/page.controller.ts";

const pageRouter = new Router();

pageRouter.get("/guide/:guideId/:pageNumber", pageController.getPageByGuideId);

export default pageRouter;
