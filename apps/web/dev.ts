#!/usr/bin/env -S deno run -A --watch=static/,routes/

import dev from "$fresh/dev.ts";
import config from "./fresh.config.ts";

import { load } from "https://deno.land/std@0.224.0/dotenv/mod.ts";

const env = await load({ envPath: ".frontend.env" });
for (const [key, value] of Object.entries(env)) {
  Deno.env.set(key, value);
}

await dev(import.meta.url, "./main.ts", config);
