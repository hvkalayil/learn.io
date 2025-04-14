import { Client } from "https://deno.land/x/postgres@v0.19.3/mod.ts";

export const createSchema = async (db: Client) => {
  const result: { schemasCreated: string[] } = { schemasCreated: [] };
  const transaction = db.createTransaction("createSchemaTransaction");
  await transaction.begin();

  await transaction.queryObject(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      username TEXT UNIQUE NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now()
    );`);
  result.schemasCreated.push("users (created/already exists)");

  await transaction.queryObject(`
    CREATE TABLE IF NOT EXISTS guides (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      description TEXT,
      cover_image_url TEXT,
      difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
      creator_id UUID NOT NULL REFERENCES users(id),
      status TEXT CHECK (status IN ('draft', 'under_review', 'published')) DEFAULT 'draft',
      created_at TIMESTAMPTZ DEFAULT now(),
      published_at TIMESTAMPTZ,
      UNIQUE(title, creator_id)
    );`);
  result.schemasCreated.push("guides (created/already exists)");

  await transaction.queryObject(`
    CREATE TABLE IF NOT EXISTS pages (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      guide_id UUID NOT NULL REFERENCES guides(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      mdx_url TEXT NOT NULL,
      page_number INT NOT NULL,
      created_at TIMESTAMPTZ DEFAULT now(),
      UNIQUE(guide_id, page_number)
    );`);
  result.schemasCreated.push("pages (created/already exists)");

  await transaction.queryObject(`
    CREATE TABLE IF NOT EXISTS migrations (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      status TEXT CHECK (status IN ('applied', 'pending')) DEFAULT 'applied'
    );`);
  result.schemasCreated.push("migrations (created/already exists)");

  await transaction.commit();
  return result;
};
