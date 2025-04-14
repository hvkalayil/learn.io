import { Client } from "https://deno.land/x/postgres/mod.ts";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config.ts";

class Database {
  private static instance: Database;
  private client: Client;
  private isConnected = false;

  private constructor() {
    this.client = new Client({
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      hostname: DB_HOST,
      port: Number(DB_PORT),
    });
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async getClient(): Promise<Client> {
    if (!this.isConnected) {
      await this.client.connect();
      this.isConnected = true;
      console.info("✅ Learn.io DB connected");
    }
    return this.client;
  }
}

export const getDbClient = async (): Promise<Client> => {
  return await Database.getInstance().getClient();
};
