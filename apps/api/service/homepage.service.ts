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
    return await DbService.executeQuery<Guide>(`
          SELECT * FROM guides
          WHERE status='published'
          ORDER BY published_at DESC;
      `);
  }
}
