import { LoveIcon } from "./icons/LoveIcon.tsx";

interface CourseCardProps {
  image: string;
  difficulty: string;
  duration: string;
  tags: string[];
  course: string;
  description: string;
}

export function CourseCard(
  { image, difficulty, duration, tags, course, description }: CourseCardProps,
) {
  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all bg-secondary subtle-gradient-reverse">
      <div className="relative">
        <img
          src={image}
          alt="alt Image"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            {difficulty}
          </span>
        </div>

        {/* Duration Badge */}
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            {duration}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* Tags */}
        <div className="flex gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className={`text-xs font-semibold px-2 py-1 rounded-md ${
                tag === "New"
                  ? "bg-blue-100 text-blue-700"
                  : "bg-amber-100 text-amber-700"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Course Title */}
        <h3 className="text-xl font-bold mb-2 leading-tight">
          {course}
        </h3>

        {/* Course Description */}
        <p className="text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Button Row */}
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 shadow-2xl subtle-gradient py-2.5 px-4 rounded-full font-medium hover:subtle-gradient-reverse focus:ring-2 focus:ring-accent focus:ring-opacity-50"
          >
            Enroll Now
          </button>

          <button
            type="button"
            className="p-2.5 subtle-gradient border border-accent shadow-2xl rounded-full hover:subtle-gradient-reverse focus:ring-2 focus:ring-red-400"
          >
            <LoveIcon />
          </button>
        </div>
      </div>
    </div>
  );
}
