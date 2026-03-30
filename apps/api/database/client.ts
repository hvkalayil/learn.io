import PocketBase from "npm:pocketbase";
import { DB_EMAIL, DB_PASSWORD, DB_URL } from "../config.ts";
class Database {
  private static instance: Database;
  private client: PocketBase;
  private isAuthenticated = false;
  private constructor() {
    this.client = new PocketBase(DB_URL);
  }
  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async getClient(): Promise<PocketBase> {
    if (!this.isAuthenticated) {
      try {
        await this.client.collection("_superusers").authWithPassword(
          DB_EMAIL,
          DB_PASSWORD,
        );
        this.isAuthenticated = true;
        console.info("✅ PocketBase Admin authenticated");
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : String(err);
        console.error("❌ PocketBase Auth Failed:", errorMessage);
      }
    }
    return this.client;
  }
}
export const getDbClient = async (): Promise<PocketBase> => {
  return await Database.getInstance().getClient();
};
