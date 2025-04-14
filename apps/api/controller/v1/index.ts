import { Router } from "@oak/oak";
import { setupSwagger } from "./swagger.ts";
import { getDbClient } from "../../middleware/db.ts";
import home from "./home/index.ts";

const v1 = new Router({ prefix: "/v1" });

setupSwagger(v1);

v1.get("/health", async (context) => {
  try {
    const db = await getDbClient();
    const result = await db.queryObject("SELECT NOW()");
    context.response.body = { health: "OK", dbTime: result.rows[0] };
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error };
  }
});

v1.use("/home", home.routes(), home.allowedMethods());

export default v1;
