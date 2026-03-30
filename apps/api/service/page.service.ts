import { GetPageParams } from "../controller/v1/page.controller.ts";
import { Page } from "../database/model/page.ts";
import { DbService } from "./db.service.ts";

export class PageService {
  static async getPageByGuideId(params: GetPageParams): Promise<{
    pages: Page[];
    maxPage: number;
  }> {
    const pages = await this.getPageByGuideIdQuery(params);
    // Derive max page number from the full set of pages for this guide
    const allPages = await DbService.getList<Page>("pages", {
      filter: `guide_id = "${params.guideId}"`,
      fields: "page_number",
    });
    const maxPage = allPages.reduce(
      (max, p) => Math.max(max, p.page_number ?? 0),
      0,
    );
    return { pages, maxPage };
  }

  private static async getPageByGuideIdQuery(params: GetPageParams) {
    // PocketBase: filter by guide_id and page_number
    return await DbService.getList<Page>("pages", {
      filter:
        `guide_id = "${params.guideId}" && page_number = ${params.pageNumber}`,
    });
  }
}
