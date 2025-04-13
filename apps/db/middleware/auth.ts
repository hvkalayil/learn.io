import { Middleware } from "@oak/oak";
import { DB_PASSWORD, DB_USER } from "../config.ts";

export const authMiddleware: Middleware = async (ctx, next) => {
  const url = new URL(ctx.request.url);
  const username = url.searchParams.get("username");
  const password = url.searchParams.get("password");

  if (username != DB_USER || password != DB_PASSWORD) {
    ctx.response.status = 401;
    ctx.response.body = { error: "Unauthorized" };
    return;
  }

  await next();
};
