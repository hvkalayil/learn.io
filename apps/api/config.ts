export const HOST = Deno.env.get("HOST") || "http://localhost";
export const PORT = Deno.env.get("PORT") || "4001";
export const DB_URL = Deno.env.get("DB_URL") || "http://127.0.0.1:8090";
export const DB_EMAIL = Deno.env.get("DB_EMAIL") || "admin@learn.io";
export const DB_PASSWORD = Deno.env.get("DB_PASSWORD") || "password goes here";
export const API_KEY = Deno.env.get("API_KEY") || "Secret key";
export const FRONTEND_HOST = Deno.env.get("FRONTEND_HOST") ||
  "http://localhost:8000";
