import { Context } from "@oak/oak";
import { HomePageService } from "../../service/homepage.service.ts";

export const homeController = {
  home: async (context: Context) => {
    try {
      const result = await HomePageService.getHomePageData();
      context.response.body = result;
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { message: "Internal Server Error", error };
    }
  },
};
