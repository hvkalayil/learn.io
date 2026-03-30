import { Guide } from "../database/model/guide.ts";
import { TokenPayload } from "./auth.service.ts";
import { DbService } from "./db.service.ts";
export class HomePageService {
  static async getHomePageData(user?: TokenPayload): Promise<{
    featured: Guide[];
  }> {
    if (user) {
      console.log("Logged in user. Logic will be catered");
    }
    const [featured] = await Promise.all([
      this.getFeaturedGuides(),
    ]);
    return { featured };
  }
  private static async getFeaturedGuides() {
    // PocketBase: filter by status and sort by published_at descending
    return await DbService.getList<Guide>("guides", {
      filter: `status = "published"`,
      sort: "-published_at",
    });
  }
}
