import { GetPageParams } from "../controller/v1/page.controller.ts";
import { Page } from "../database/model/page.ts";
import { DbService } from "./db.service.ts";

export class PageService {
  static async getPageByGuideId(params: GetPageParams): Promise<{
    pages: Page[];
    maxPage: number;
  }> {
    const [pages] = await Promise.all([
      this.getPageByGuideIdQuery(params),
    ]);
    return { pages, maxPage: pages[0].max_page };
  }

  private static async getPageByGuideIdQuery(params: GetPageParams) {
    return await DbService.executeQuery<Page & { max_page: number }>(`
          SELECT *, (
            SELECT MAX(page_number)
            FROM pages
            WHERE guide_id='${params.guideId}'
          ) AS max_page
          FROM pages
          WHERE guide_id='${params.guideId}' AND page_number=${params.pageNumber};
      `);
  }
}
