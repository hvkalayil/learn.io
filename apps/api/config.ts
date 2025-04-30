export const HOST = Deno.env.get("HOST") || "http://localhost";
export const PORT = Deno.env.get("PORT") || "4000";
export const DB_USER = Deno.env.get("DB_USER") || "learnio_user";
export const DB_PASSWORD = Deno.env.get("DB_PASSWORD") || "password goes here";
export const DB_NAME = Deno.env.get("DB_NAME") || "learnio";
export const DB_HOST = Deno.env.get("DB_HOST") || "localhost";
export const DB_PORT = Deno.env.get("DB_PORT") || "5432";
export const API_KEY = Deno.env.get("API_KEY") || "SECRET_API_KEY";
export const FRONTEND_HOST = Deno.env.get("FRONTEND_HOST") ||
  "http://localhost:8000";
export const FRONTEND_HOST_LOCAL = Deno.env.get("FRONTEND_HOST_LOCAL") ||
  "http://localhost:8000";
