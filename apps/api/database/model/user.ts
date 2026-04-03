import { RecordModel } from "npm:pocketbase";
export interface User extends RecordModel {
  id: string;
  email: string;
  password: string;
  type: "admin" | "learner" | "teacher";
  created_at: string;
}
