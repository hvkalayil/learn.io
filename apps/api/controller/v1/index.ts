import { Router } from "@oak/oak";

const router = new Router({ prefix: "/v1" });

router.get("/health", (context) => {
  context.response.body = { health: "OK" };
});

export default router;
