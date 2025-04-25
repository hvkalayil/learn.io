import { Context } from "@oak/oak";
import { HomePageService } from "../../service/homepage.service.ts";
import { TokenPayload } from "../../service/auth.service.ts";
import { sendErrorResponse } from "../../utils/response.ts";

export const homeController = {
  home: async (context: Context) => {
    try {
      const user = context.state.user as TokenPayload;
      const result = await HomePageService.getHomePageData(user);
      context.response.body = result;
    } catch (error) {
      sendErrorResponse(context, error);
    }
  },
};
