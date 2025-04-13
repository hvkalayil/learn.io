import { load } from "https://deno.land/std@0.220.1/dotenv/mod.ts";

// This loads the env file for local development
await load({
  envPath: ".db.env",
  export: true,
});

await import("./main.ts");
