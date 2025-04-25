export interface User {
  id: string;
  email: string;
  password: string;
  type: "admin" | "learner" | "teacher";
  created_at: string;
}
