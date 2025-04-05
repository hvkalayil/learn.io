import { Context, Next } from "@oak/oak";

export async function logger(ctx: Context, next: Next) {
  const start = performance.now();
  await next();
  const ms = performance.now() - start;

  console.log(
    `[${
      new Date().toISOString()
    }] ${ctx.request.method} ${ctx.request.url} - ${ctx.response.status} (${
      ms.toFixed(2)
    }ms)`,
  );
}
