export interface GuideModel {
  title: string;
  description: string;
  cover_image_url: string;
  difficulty_level: string;
  status: string;
  username: string;
  pages: PageModel[];
}
export interface PageModel {
  title: string;
  mdx_url: string;
  page_number: number;
}

export const SEED_DATA_GUIDES: GuideModel[] = [
  {
    title: "How to be a Tarzan Developer",
    description: "A guide to becoming a Tarzan developer 🏕️💻",
    cover_image_url:
      "https://hvkalayil.github.io/_astro/tarzan%20deploying.Dng-ET2Z_2tBT5k.webp",
    difficulty_level: "intermediate",
    status: "published",
    username: "empuran",
    pages: [
      {
        title: "How to be a Tarzan Developer",
        mdx_url: "mdx url goes here",
        page_number: 1,
      },
    ],
  },
];
