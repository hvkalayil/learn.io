import { Context } from "@oak/oak";
import { DbService } from "../../service/db.service.ts";

export const v1Controller = {
  health: async (context: Context) => {
    try {
      const result = await DbService.checkHealth();
      context.response.body = { health: "OK", dbTime: result.rows[0] };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { message: "Internal Server Error", error };
    }
  },
};
