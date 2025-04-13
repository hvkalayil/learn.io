import { Router } from "@oak/oak";
import { setupSwagger } from "./swagger.ts";
import { getDbClient } from "../middleware/db.ts";
import {
  applyMigrations,
  createSchema,
  seedData,
} from "../service/db.service.ts";

const router = new Router();

setupSwagger(router);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Endpoint to check the health of the database connection and retrieve the current database time.
 *     responses:
 *       200:
 *         description: Returns the health status and the current database time.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 health:
 *                   type: string
 *                   example: "OK"
 *                 dbTime:
 *                   type: string
 *                   example: "2025-04-09T12:34:56.789Z"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: object
 *                   example: { "message": "Database connection failed" }
 */
router.get("/health", async (context) => {
  try {
    const db = await getDbClient();
    const result = await db.queryObject("SELECT NOW()");
    context.response.body = { health: "OK", dbTime: result.rows[0] };
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error };
  }
});

/**
 * @openapi
 * /create:
 *   get:
 *     summary: Create Schema
 *     description: Endpoint to create the database schema. Run this if setting up database for the first time
 *     responses:
 *       200:
 *         description: Returns success message and list of schemas created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Schemas created successfully"
 *                 schemasCreated:
 *                   type: array
 *                   items:
 *                    type: string
 *                    example: "users (created/already exists)"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: object
 *                   example: { "message": "Transaction failed" }
 */
router.get("/create", async (context) => {
  try {
    const db = await getDbClient();
    const result = await createSchema(db);
    context.response.body = {
      message: "Schemas created successfully",
      ...result,
    };
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error };
  }
});

/**
 * @openapi
 * /seed:
 *   get:
 *     summary: Seed data
 *     description: Endpoint to create seeding data.
 *     responses:
 *       200:
 *         description: Returns success message and list of data added.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Seeding completed successfully"
 *                 dataAdded:
 *                   type: array
 *                   items:
 *                    type: string
 *                    example: "Added (1) user"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: object
 *                   example: { "message": "Transaction failed" }
 */
router.get("/seed", async (context) => {
  try {
    const db = await getDbClient();
    const result = await seedData(db);
    context.response.body = {
      message: "Seeding completed successfully",
      ...result,
    };
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error };
  }
});

/**
 * @openapi
 * /migrate:
 *   get:
 *     summary: Apply migrations
 *     description: Endpoint to apply migrations required..
 *     responses:
 *       200:
 *         description: Returns success message and list of migrations applied.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Migrations completed successfully"
 *                 migrations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       file:
 *                         type: string
 *                         example: "001_migration_file_name"
 *                       status:
 *                         type: string
 *                         example: "applied"
 *       500:
 *         description: Internal Server Error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: object
 *                   example: { "message": "Transaction failed" }
 */
router.get("/migrate", async (context) => {
  try {
    const db = await getDbClient();
    const result = await applyMigrations(db);
    context.response.body = {
      message: "Migrations completed successfully",
      migrations: result,
    };
  } catch (error) {
    console.error(error);
    context.response.status = 500;
    context.response.body = { message: "Internal Server Error", error };
  }
});

export default router;
