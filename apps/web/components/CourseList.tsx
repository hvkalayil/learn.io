import { CourseCard } from "./CourseCard.tsx";

export function CourseList() {
  const image = "https://picsum.photos/200";
  const description =
    "Learn the latest techniques in responsive design, performance optimization, and modern frameworks.";
  const tags = ["New", "Bestseller"];
  const difficulty = "Intermediate";
  const duration = "8 weeks";
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
      {["Course 1", "Course 2", "Course 3"].map((course) => (
        <CourseCard
          key={course}
          course={course}
          description={description}
          difficulty={difficulty}
          duration={duration}
          image={image}
          tags={tags}
        />
      ))}
    </div>
  );
}
