import { Context } from "@oak/oak";
import { DbService } from "../../service/db.service.ts";
import { sendErrorResponse } from "../../utils/response.ts";

export const v1Controller = {
  health: async (context: Context) => {
    try {
      const result = await DbService.checkHealth();
      context.response.body = {
        health: result.alive ? "OK" : "FAIL",
        message: result.message,
      };
    } catch (error) {
      sendErrorResponse(context, error);
    }
  },
};
