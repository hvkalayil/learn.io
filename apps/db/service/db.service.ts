import { getDbClient } from "../database/client.ts";
import { createSchema } from "../database/schema.ts";
import { applyMigrations } from "../database/migration.ts";
import { seedData } from "../database/seed.ts";

export class DbService {
  static async getHealth() {
    const db = await getDbClient();
    const result = await db.queryObject("SELECT NOW()");
    return result;
  }

  static async createDatabaseSchema() {
    const db = await getDbClient();
    const result = await createSchema(db);
    return result;
  }

  static async applyMigrations() {
    const db = await getDbClient();
    const result = await applyMigrations(db);
    return result;
  }

  static async seedDatabase() {
    const db = await getDbClient();
    const result = await seedData(db);
    return result;
  }
}
