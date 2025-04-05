import { CourseList } from "./CourseList.tsx";

export function AllCourses() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Featured Courses</h2>
      <CourseList />
    </div>
  );
}
