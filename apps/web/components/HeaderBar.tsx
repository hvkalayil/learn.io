import { ProfileIcon } from "./icons/ProfileIcon.tsx";
import { LoginIcon } from "./icons/LoginIcon.tsx";

export function HeaderBar({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <header className="sticky top-0 z-50 glass border-b border-white/5 backdrop-blur-xl px-6 md:px-12 py-5 flex justify-between items-center transition-all">
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="w-10 h-10 bg-accent rounded-xl rotate-12 group-hover:rotate-0 transition-transform flex items-center justify-center text-primary font-black text-xl shadow-[0_0_20px_rgba(var(--accent-rgb),0.3)]">
          L
        </div>
        <h1 className="text-2xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
          Learn.io
        </h1>
      </div>

      <nav className="flex items-center gap-4">
        {isLoggedIn
          ? (
            <button
              type="button"
              className="flex items-center gap-3 px-5 py-2.5 rounded-2xl glass hover:bg-white/10 transition-all border border-white/10 hover:border-accent/40 group"
            >
              <div className="text-accent group-hover:scale-110 transition-transform">
                <ProfileIcon />
              </div>
              <span className="hidden sm:inline font-medium text-sm">
                Dashboard
              </span>
            </button>
          )
          : (
            <a
              href="/auth/login"
              className="btn-primary flex items-center gap-2 text-sm shadow-[0_4px_20px_rgba(var(--accent-rgb),0.4)]"
            >
              <LoginIcon />
              <span>Login to Start</span>
            </a>
          )}
      </nav>
    </header>
  );
}
