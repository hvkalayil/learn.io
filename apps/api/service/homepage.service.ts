import { Guide } from "../database/model/guide.ts";
import { DbService } from "./db.service.ts";

export class HomePageService {
  static async getHomePageData(): Promise<{
    featured: Guide[];
  }> {
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
