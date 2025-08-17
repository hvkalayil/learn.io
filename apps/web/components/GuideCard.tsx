import { Guide } from "../lib/models/Guide.ts";
import { LoveIcon } from "./icons/LoveIcon.tsx";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <div className="hover:animate-float max-w-sm rounded-xl overflow-hidden shadow-2xl transition-all bg-secondary subtle-gradient-reverse">
      <div className="relative">
        <img
          src={guide.cover_image_url}
          alt="alt Image"
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        </div>

        {/* Difficulty Badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 text-gray-800 text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            {/* Capitalizing first character */}
            {guide.difficulty_level.charAt(0).toUpperCase() +
              guide.difficulty_level.slice(1)}
          </span>
        </div>
      </div>

      <div className="p-5">
        {/* guide Title */}
        <a href={`/guides/${guide.id}`}>
          <h3 className="text-xl font-bold mb-2 leading-tight">
            {guide.title}
          </h3>
        </a>

        {/* guide Description */}
        <p className="text-sm mb-4 line-clamp-2">
          {guide.description}
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
