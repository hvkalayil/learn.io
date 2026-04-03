export function TeacherDashboard() {
  return (
    <div className="relative group">
      <div className="p-8 blur-sm pointer-events-none transition-all duration-700 opacity-30">
        <h2 className="text-3xl font-bold mb-8 tracking-tight">
          Educator's Command Center
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass p-8 rounded-[2rem] border border-white/5">
            <h3 className="text-xl font-bold mb-2">Pending Reviews</h3>
            <p className="text-white/40 text-sm font-medium mb-6">
              You have 3 student submissions awaiting your feedback.
            </p>
            <button
              type="button"
              className="w-full px-6 py-4 glass rounded-2xl text-sm font-bold text-accent transition-all border border-accent/20 hover:bg-accent/10"
            >
              Start Review Session
            </button>
          </div>
          <div className="glass p-8 rounded-[2rem] border border-white/5">
            <h3 className="text-xl font-bold mb-2">Active Drafts</h3>
            <p className="text-white/40 text-sm font-medium mb-6">
              Pick up where you left off on 2 new course guides.
            </p>
            <button
              type="button"
              className="w-full px-6 py-4 glass rounded-2xl text-sm font-bold text-white transition-all border border-white/5 hover:bg-white/5"
            >
              Continue Crafting
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 backdrop-blur-sm rounded-[2rem]">
        <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center text-accent mb-6 shadow-[0_0_30px_rgba(var(--accent-rgb),0.2)]">
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
            <path d="M20 7h-9" />
            <path d="M14 17H5" />
            <circle cx="17" cy="17" r="3" />
            <circle cx="7" cy="7" r="3" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold tracking-tight mb-2">
          Empowering Educators
        </h3>
        <p className="text-white/40 text-sm font-medium">
          Your teaching toolkit is being handcrafted.
        </p>
      </div>
    </div>
  );
}
