import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";
import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

export const applyMigrations = async (db: Client) => {
  const result: { file: string; status: "applied" | "already applied" }[] = [];
  const transaction = db.createTransaction("applyMigrationsTransaction");
  await transaction.begin();

  const existingMigrations = await transaction.queryObject<{ name: string }>(`
    SELECT name FROM migrations WHERE status='applied';
  `);
  const migratedFiles = new Set<string>(
    existingMigrations.rows.map((row) => row.name),
  );

  for await (
    const entry of walk("./migrations", { exts: [".sql"], includeFiles: true })
  ) {
    const filename = entry.name;

    if (migratedFiles.has(filename)) {
      result.push({
        file: filename,
        status: "already applied",
      });
      continue;
    }

    const sql = await Deno.readTextFile(entry.path);
    await transaction.queryObject(sql);
    await transaction.queryObject(`
      INSERT INTO migrations (name) VALUES ('${filename}') ON CONFLICT DO NOTHING;
    `);
    result.push({
      file: filename,
      status: "applied",
    });
  }

  await transaction.commit();
  return result;
};
