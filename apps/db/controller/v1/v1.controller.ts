import { Context } from "@oak/oak/context";
import { DbService } from "../../service/db.service.ts";

export const v1Controller = {
  health: async (context: Context) => {
    try {
      const result = await DbService.getHealth();
      context.response.body = { health: "OK", dbTime: result.rows[0] };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { message: "Internal Server Error", error };
    }
  },

  create: async (context: Context) => {
    try {
      const result = await DbService.createDatabaseSchema();
      context.response.body = {
        message: "Schemas created successfully",
        ...result,
      };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { message: "Internal Server Error", error };
    }
  },

  seed: async (context: Context) => {
    try {
      const result = await DbService.seedDatabase();
      context.response.body = {
        message: "Seeding completed successfully",
        ...result,
      };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { message: "Internal Server Error", error };
    }
  },

  migrate: async (context: Context) => {
    try {
      const result = await DbService.applyMigrations();
      context.response.body = {
        message: "Migrations completed successfully",
        migrations: result,
      };
    } catch (error) {
      console.error(error);
      context.response.status = 500;
      context.response.body = { message: "Internal Server Error", error };
    }
  },
};
