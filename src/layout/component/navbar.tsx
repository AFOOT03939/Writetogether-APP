import { type MouseEventHandler } from "react";

interface Props{
  onSignup: MouseEventHandler;
  onLogin: MouseEventHandler;
  isLogged: boolean;
  name: string | undefined;
}

export default function Navbar({ onLogin, onSignup, isLogged, name }: Props) {

    const logout = async (e: React.FormEvent) => {
        localStorage.removeItem("token")
        window.location.reload();
    }

  return (
    <header className="sticky top-0 z-50 bg-[var(--color-dark,#333)] shadow-md">

      <div className="flex items-center justify-between px-4 md:px-6 py-3 gap-4">

        {/* LEFT */}
        <div className="flex items-center gap-4">

          <div className="w-10 h-10 bg-[var(--color-primary,#e67e22)] rounded-full flex items-center justify-center font-bold text-[#333]">
            W
          </div>

          <div className="relative group hidden sm:block">
            <span className="cursor-pointer text-white font-medium">
              Stories +
            </span>

            <div className="absolute left-0 mt-2 w-48 bg-[var(--color-bg-secondary,#2c1810)] border border-[var(--color-border,#4a3426)] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200">

              <div className="flex flex-col">
                <span className="px-4 py-2 hover:bg-orange-500 hover:text-white cursor-pointer">
                  My Stories
                </span>
                <span className="px-4 py-2 hover:bg-orange-500 hover:text-white cursor-pointer">
                  Popular
                </span>
                <span className="px-4 py-2 hover:bg-orange-500 hover:text-white cursor-pointer">
                  New
                </span>
              </div>

            </div>
          </div>

        </div>

        {/* SEARCH */}
        <div className="flex-1 flex justify-center">
          <input
            placeholder="Search stories..."
            className="bg-white w-full max-w-md px-4 py-2 rounded-full text-[#333] text-sm outline-none focus:bg-white focus:shadow-lg focus:shadow-orange-400/40 transition"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-2 md:gap-3 text-white text-sm">

          {isLogged && (
          <>
              <span className="hidden md:block">Hello: {name}</span>

              <button className="px-3 md:px-4 py-2 rounded-full bg-[var(--color-primary,#e67e22)] hover:bg-[var(--color-secondary)] transition transform hover:-translate-y-0.5 text-xs md:text-sm">
                Start a new story
              </button>

              <button className="px-3 md:px-4 py-2 rounded-full border-2 border-[var(--color-primary,#e67e22)] text-[var(--color-primary,#e67e22)] hover:bg-[var(--color-primary,#e67e22)] hover:text-white transition text-xs md:text-sm">
                Profile
              </button>
            </>
          )}

          {!isLogged && (
            <>
              {/* LOGIN */}
              <span
              onClick={onLogin}
              className="text-[var(--color-primary,#e67e22)] cursor-pointer hover:underline text-xs md:text-sm"
              >
              Log-in
              </span>

              {/* SIGNUP */}
              <span
                onClick={onSignup}
                className="text-[var(--color-primary,#e67e22)] cursor-pointer hover:underline text-xs md:text-sm"
              >
                Sign-up
              </span>
            </>
          )}

          {/* LOGOUT */}
          {isLogged && (
          <span 
            onClick={logout}
            className="text-[var(--color-primary,#e67e22)] cursor-pointer hover:underline hover:text-orange-400 text-xs md:text-sm">
            Log-out
          </span>
          )}

        </div>
      </div>
    </header>
  );
}