import {
  Client,
  Transaction,
} from "https://deno.land/x/postgres@v0.19.3/mod.ts";
import { GuideModel, PageModel, SEED_DATA_GUIDES } from "./util.service.ts";
import { walk } from "https://deno.land/std@0.224.0/fs/walk.ts";

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

export const seedData = async (db: Client) => {
  let userCount = 0;
  let guideCount = 0;
  let pageCount = 0;
  const transaction = db.createTransaction("seedDataTransaction");
  await transaction.begin();

  for (const guide of SEED_DATA_GUIDES) {
    const { userId, ucount } = await getUserId(transaction, guide.username);
    userCount += ucount;
    const { guideId, gcount } = await getGuideId(transaction, userId, guide);
    guideCount += gcount;
    const pcount = await createPages(transaction, guideId, guide.pages);
    pageCount += pcount;
  }

  await transaction.commit();
  return {
    dataAdded: [
      `Added (${userCount}) users`,
      `Added (${guideCount}) guides`,
      `Added (${pageCount}) pages`,
    ],
  };
};

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

// Utility Functions

async function getUserId(transaction: Transaction, username: string) {
  const userSeedResult = await transaction.queryObject<{ id: string }>(`
    INSERT INTO users (username) VALUES ('${username}') ON CONFLICT DO NOTHING RETURNING id;
  `);

  let userId: string;
  let ucount: number;
  if (userSeedResult.rowCount) {
    userId = userSeedResult.rows[0].id;
    ucount = 1;
  } else {
    const existingUser = await transaction.queryObject<{ id: string }>(`
      SELECT id FROM users WHERE username='empuran';
    `);
    userId = existingUser.rows[0].id;
    ucount = 0;
  }
  return { userId, ucount };
}

async function getGuideId(
  transaction: Transaction,
  userId: string,
  guide: GuideModel,
) {
  const guideSeedResult = await transaction.queryObject<{ id: string }>(`
    INSERT INTO guides (
      title,
      description,
      cover_image_url,
      difficulty_level,
      creator_id,
      status
    )
    VALUES
    (
      '${guide.title}',
      '${guide.description}',
      '${guide.cover_image_url}',
      '${guide.difficulty_level}',
      '${userId}',
      '${guide.status}'
    ) ON CONFLICT DO NOTHING RETURNING id;`);

  let guideId: string;
  let gcount;
  if (guideSeedResult.rowCount) {
    guideId = guideSeedResult.rows[0].id;
    gcount = 1;
  } else {
    const existingGuide = await transaction.queryObject<{ id: string }>(`
        SELECT id FROM guides WHERE title='${guide.title}' AND creator_id='${userId}'
      `);
    guideId = existingGuide.rows[0].id;
    gcount = 0;
  }
  return { guideId, gcount };
}

async function createPages(
  transaction: Transaction,
  guideId: string,
  pages: PageModel[],
) {
  let count = 0;
  for (const page of pages) {
    const pageSeedResult = await transaction.queryObject<{ id: string }>(`
      INSERT INTO pages (
        guide_id,
        title,
        mdx_url,
        page_number
      )
      VALUES
      (
        '${guideId}',
        '${page.title}',
        '${page.mdx_url}',
        ${page.page_number}
      ) ON CONFLICT DO NOTHING RETURNING id;`);

    if (pageSeedResult.rowCount) {
      count++;
    }
  }
  return count;
}
