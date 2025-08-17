import { RouterContext } from "@oak/oak";
import { sendErrorResponse } from "../../utils/response.ts";
import { PageService } from "../../service/page.service.ts";

type GetPageContext = RouterContext<"/guide/:guideId/:pageNumber">;
export type GetPageParams = { guideId: string; pageNumber: string };

export const pageController = {
  getPageByGuideId: async (context: GetPageContext) => {
    try {
      const params = context.params;
      const result = await PageService.getPageByGuideId(params);
      context.response.body = result;
    } catch (error) {
      sendErrorResponse(context, error);
    }
  },
};
