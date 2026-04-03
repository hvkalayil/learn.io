import { Guide } from "../lib/models/Guide.ts";
import { LoveIcon } from "./icons/LoveIcon.tsx";

export function GuideCard({ guide }: { guide: Guide }) {
  return (
    <div className="group relative glass rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 max-w-sm w-full">
      <div className="relative h-56 overflow-hidden">
        <img
          src={guide.cover_image_url}
          alt={guide.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />

        {/* Difficulty Badge */}
        <div className="absolute top-4 left-4">
          <span className="glass px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-accent border border-accent/20">
            {guide.difficulty_level}
          </span>
        </div>
      </div>

      <div className="p-6 relative">
        <div className="flex justify-between items-start mb-3">
          <a href={`/guides/${guide.id}`} className="flex-1">
            <h3 className="text-xl font-bold leading-tight hover:text-accent transition-colors">
              {guide.title}
            </h3>
          </a>
          <button
            type="button"
            className="ml-4 p-2.5 rounded-xl glass hover:bg-white/10 text-white/40 hover:text-rose-400 transition-all border border-white/5 active:scale-95"
          >
            <LoveIcon />
          </button>
        </div>

        <p className="text-sm text-white/50 mb-6 line-clamp-2 font-medium leading-relaxed">
          {guide.description}
        </p>

        <button
          type="button"
          onClick={() => globalThis.location.href = `/guides/${guide.id}`}
          className="w-full btn-primary bg-accent !py-4 text-sm tracking-wide uppercase font-bold"
        >
          Explore Guide
        </button>
      </div>

      {/* Decorative Shimmer */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
        <div className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%] rotate-45 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      </div>
    </div>
  );
}
