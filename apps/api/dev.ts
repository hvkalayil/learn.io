import { load } from "https://deno.land/std@0.220.1/dotenv/mod.ts";

await load({
  envPath: ".api.env",
  export: true,
});

await import("./main.ts");
