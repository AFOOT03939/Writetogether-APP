import { useState } from 'react';

interface Props {
  type: 'login' | 'signup';
  onClose: () => void;
  switchMode: (mode: 'login' | 'signup') => void;
}

export default function AuthModal({ type, onClose, switchMode }: Props) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const isLogin = type === 'login';

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const endpoint = isLogin ? '/Users/Login' : '/Users/Create';

      const body = isLogin
        ? {
            NameUs: form.name,
            PasswordUs: form.password,
          }
        : {
            NameUs: form.name,
            EmailUs: form.email,
            PasswordUs: form.password,
            DateUs: new Date().toISOString(),
          };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      alert(data.message);

      onClose();
      window.location.reload();

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      {/* CARD */}
      <div className="bg-[var(--color-primary)] w-[350px] md:w-[400px] p-6 rounded-xl relative shadow-2xl">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full border-2 border-red-500 text-red-500 flex items-center justify-center hover:scale-110 transition"
        >
          x
        </button>

        {/* TITLE */}
        <h1 className="text-4xl text-white text-center mb-6 font-light">
          {isLogin ? 'Log-in' : 'Sign-Up'}
        </h1>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">

          {/* NAME */}
          <div>
            <label className="text-white text-sm">Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="User..."
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
            />
          </div>

          {/* EMAIL (solo signup) */}
          {!isLogin && (
            <div>
              <label className="text-white text-sm">E-mail</label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="user@domain.com"
                className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
              />
            </div>
          )}

          {/* PASSWORD */}
          <div>
            <label className="text-white text-sm">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full mt-1 p-2 rounded-lg bg-gray-800 text-white outline-none"
            />
          </div>

          {/* SWITCH */}
          <div className="text-sm text-white mt-2">
            {isLogin ? (
              <>
                Don't have an account?{' '}
                <span
                  className="underline cursor-pointer"
                  onClick={() => switchMode('signup')}
                >
                  Sign-up
                </span>
              </>
            ) : (
              <>
                Have already an account?{' '}
                <span
                  className="underline cursor-pointer"
                  onClick={() => switchMode('login')}
                >
                  Log-in
                </span>
              </>
            )}
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="mt-3 bg-[var(--color-bg-input)] text-orange-400 py-2 rounded-lg hover:scale-105 transition"
          >
            {isLogin ? 'Log-in' : 'Sign-up'}
          </button>

        </form>
      </div>
    </div>
  );
}