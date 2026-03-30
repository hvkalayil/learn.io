import { RecordModel } from "npm:pocketbase";
export interface Page extends RecordModel {
  id: string;
  guide_id: string;
  title: string;
  mdx_url: string;
  page_number: number;
  created_at: string;
}
