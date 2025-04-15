import { ProfileIcon } from "./icons/ProfileIcon.tsx";
import { LoginIcon } from "./icons/LoginIcon.tsx";

export function HeaderBar() {
  return (
    <header className="subtle-gradient mary p-4 py-8 flex justify-between items-center">
      <h1 className="text-4xl font-extrabold tracking-wide">
        Learn.io
      </h1>
      <nav className="flex gap-6">
        <button
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-transform transform hover:subtle-gradient subtle-gradient-reverse"
        >
          <ProfileIcon />
          <span className="hidden sm:inline">Profile</span>
        </button>

        <a
          href="/auth/login"
          type="button"
          className="flex items-center gap-2 px-4 py-2 rounded-full shadow-md transition-transform transform hover:subtle-gradient subtle-gradient-reverse"
        >
          <LoginIcon />
          <span className="hidden sm:inline">Login</span>
        </a>
      </nav>
    </header>
  );
}
