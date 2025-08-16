import {
  Client,
  Transaction,
} from "https://deno.land/x/postgres@v0.19.3/mod.ts";

interface GuideModel {
  title: string;
  description: string;
  cover_image_url: string;
  difficulty_level: string;
  status: string;
  email: string;
  pages: PageModel[];
}
interface PageModel {
  title: string;
  mdx_url: string;
  page_number: number;
}

const SEED_DATA_GUIDES: GuideModel[] = [
  {
    title: "How to be a Tarzan Developer",
    description: "A guide to becoming a Tarzan developer 🏕️💻",
    cover_image_url:
      "https://hvkalayil.github.io/_astro/tarzan%20deploying.Dng-ET2Z_2tBT5k.webp",
    difficulty_level: "intermediate",
    status: "published",
    email: "empuran",
    pages: [
      {
        title: "How to be a Tarzan Developer",
        mdx_url: "mdx url goes here",
        page_number: 1,
      },
    ],
  },
  {
    title: "The BATS Stack",
    description:
      "aka “The Avengers of content-focused web dev” — but without the multi-billion-dollar budget.",
    cover_image_url:
      "https://raw.githubusercontent.com/hvkalayil/hvkalayil.github.io/main/src/content/blogs/The%20BATS%20Stack/hero.webp",
    difficulty_level: "intermediate",
    status: "published",
    email: "empuran",
    pages: [
      {
        title: "The BATS Stack",
        mdx_url:
          "https://raw.githubusercontent.com/hvkalayil/hvkalayil.github.io/main/src/content/blogs/The%20BATS%20Stack/The%20BATS%20Stack.md",
        page_number: 1,
      },
    ],
  },
  {
    title: "DIY Cloud Wizard 🪄",
    description:
      "Because sometimes localhost:3000 just isn’t spicy enough.  🌶️",
    cover_image_url:
      "https://raw.githubusercontent.com/hvkalayil/hvkalayil.github.io/main/src/content/blogs/DIY%20Cloud%20Wizard/hero.webp",
    difficulty_level: "intermediate",
    status: "published",
    email: "empuran",
    pages: [
      {
        title: "DIY Cloud Wizard 🪄",
        mdx_url:
          "https://raw.githubusercontent.com/hvkalayil/hvkalayil.github.io/main/src/content/blogs/DIY%20Cloud%20Wizard/DIY%20Cloud%20Wizard.md",
        page_number: 1,
      },
    ],
  },
];

export const seedData = async (db: Client) => {
  let userCount = 0;
  let guideCount = 0;
  let pageCount = 0;
  const transaction = db.createTransaction("seedDataTransaction");
  await transaction.begin();

  for (const guide of SEED_DATA_GUIDES) {
    const { userId, ucount } = await getUserId(transaction, guide.email);
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

async function getUserId(transaction: Transaction, email: string) {
  const userSeedResult = await transaction.queryObject<{ id: string }>(`
      INSERT INTO users (email,password,type) VALUES ('${email}', 'cicada', 'admin') ON CONFLICT DO NOTHING RETURNING id;
    `);

  let userId: string;
  let ucount: number;
  if (userSeedResult.rowCount) {
    userId = userSeedResult.rows[0].id;
    ucount = 1;
  } else {
    const existingUser = await transaction.queryObject<{ id: string }>(`
        SELECT id FROM users WHERE email='empuran';
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
