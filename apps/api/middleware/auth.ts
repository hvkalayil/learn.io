import { Context, Middleware, Next } from "@oak/oak";
import { AuthService, TokenPayload } from "../service/auth.service.ts";

export interface State {
  user?: TokenPayload;
}

export const optionalAuth: Middleware<State> = async (ctx, next) => {
  await authMiddleware(ctx, next, true);
};

export const mandatoryAuth: Middleware<State> = async (ctx, next) => {
  await authMiddleware(ctx, next, false);
};

async function authMiddleware(
  ctx: Context<State>,
  next: Next,
  isOptional: boolean,
) {
  const token = getBearerToken(ctx.request.headers.get("Authorization"));

  if (token === "") {
    if (isOptional) return await next();
    return unauthorized(ctx, "Unauthorized: No token provided", 403);
  }

  try {
    const payload = await AuthService.verifyToken(token);
    if (payload) {
      ctx.state.user = payload;
    }
    await next();
  } catch (err) {
    console.error("Token verification failed:", err);
    return unauthorized(ctx, "Unauthorized: Invalid or expired token");
  }
}

function getBearerToken(header: string | null): string {
  if (!header || !header.startsWith("Bearer ")) return "";
  return header.replace("Bearer", "").trim();
}

function unauthorized(ctx: Context, message: string, code: number = 401) {
  ctx.response.status = code;
  ctx.response.body = { message };
}
