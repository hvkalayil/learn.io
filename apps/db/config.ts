export const HOST = Deno.env.get("HOST") || "http://localhost";
export const PORT = Deno.env.get("PORT") || "4001";
export const DB_USER = Deno.env.get("DB_USER") || "learnio_creator";
export const DB_PASSWORD = Deno.env.get("DB_PASSWORD") || "password goes here";
export const DB_NAME = Deno.env.get("DB_NAME") || "learnio";
export const DB_HOST = Deno.env.get("DB_HOST") || "localhost";
export const DB_PORT = Deno.env.get("DB_PORT") || "5432";
export const FRONTEND_HOST = Deno.env.get("FRONTEND_HOST") ||
  "http://localhost:8000";
