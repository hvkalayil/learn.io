export type Guide = {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  difficulty_level: string;
  creator_id: string;
  status: string;
  created_at: string;
  published_at: string;
};

export interface HomePageGuides {
  featured: Guide[];
}
