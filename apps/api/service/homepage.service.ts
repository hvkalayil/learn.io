import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { Guide } from "../model/guide.ts";

export const getGuideList = async (db: Client) => {
  const guides = await db.queryObject<Guide>(`
        SELECT * FROM guides
        WHERE status='published'
        ORDER BY published_at DESC;
    `);
  return guides.rows;
};
