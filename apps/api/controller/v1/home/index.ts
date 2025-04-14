import { Router } from "@oak/oak";
import { getDbClient } from "../../../middleware/db.ts";
import { getGuideList } from "../../../service/homepage.service.ts";

const home = new Router();

home.get("/guides", async (context) => {
  try {
    const db = await getDbClient();
    const guides = await getGuideList(db);
    context.response.body = { guides };
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error };
  }
});

export default home;
