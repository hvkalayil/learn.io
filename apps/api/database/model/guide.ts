import { RecordModel } from "npm:pocketbase";
export interface Guide extends RecordModel {
  id: string;
  title: string;
  description: string;
  cover_image_url: string;
  difficulty_level: string;
  creator_id: string;
  status: string;
  created_at: string;
  published_at: string;
}
