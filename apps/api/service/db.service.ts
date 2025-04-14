import { QueryArguments } from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { getDbClient } from "../database/client.ts";

export class DbService {
  static async executeQuery<T>(
    query: string,
    args?: QueryArguments | undefined,
  ): Promise<T[]> {
    const db = await getDbClient();
    const result = await db.queryObject<T>(query, args);
    return result.rows;
  }

  static async checkHealth() {
    const db = await getDbClient();
    const result = await db.queryObject("SELECT NOW()");
    return result;
  }
}
