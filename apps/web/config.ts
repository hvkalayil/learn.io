export const API_URL = Deno.env.get("API_URL") || "http://localhost:4000/v1";
export const REFRESH_TOKEN_URL = `${API_URL}/auth/refresh`;
export const LOGIN_URL = `${API_URL}/auth/login`;
