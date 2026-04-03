export function YourLearning() {
  return (
    <div className="relative group">
      <div className="p-8 blur-sm pointer-events-none transition-all duration-700 opacity-30">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Continue Your Journey
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {["Advanced React Patterns", "Python for Data Science"].map((
            course,
          ) => (
            <div
              key={course}
              className="glass p-8 rounded-[2rem] border border-white/5"
            >
              <h3 className="text-xl font-bold mb-4">{course}</h3>
              <div className="w-full bg-white/5 h-3 rounded-full mt-2 overflow-hidden shadow-inner">
                <div
                  className="bg-accent h-full rounded-full shadow-[0_0_15px_rgba(var(--accent-rgb),0.5)]"
                  style={{ width: "65%" }}
                >
                </div>
              </div>
              <div className="mt-8 flex justify-between items-center">
                <span className="text-xs font-mono text-white/40 font-bold uppercase tracking-widest">
                  65% Complete
                </span>
                <button
                  type="button"
                  className="px-6 py-2.5 glass rounded-xl text-sm font-bold text-white transition-all border border-white/5"
                >
                  Resume
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-sm rounded-[2rem]">
        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          Refining Your Experience
        </h3>
        <p className="text-white/40 text-sm font-medium">
          Personalized learning paths are arriving soon.
        </p>
      </div>
    </div>
  );
}
