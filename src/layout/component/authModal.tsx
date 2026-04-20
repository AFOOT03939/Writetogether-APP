import { useState } from 'react';
import { Login } from '../api/auth.api';
import { Register } from '../api/auth.api';

interface Props {
  type: 'login' | 'signup';
  onClose: () => void;
  switchMode: (mode: 'login' | 'signup') => void;
  setLogged(logged: boolean): void;
}

export default function AuthModal({ type, onClose, switchMode, setLogged }: Props) {
    const [form, setForm] = useState({
        userName: '',
        email: '',
        password: '',
    });

    const isLogin = type === 'login';

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    
    const login = async (email: string, password: string) => {
        const body = {
            email: email,
            password: password
        }

        const res = await Login(body)
        localStorage.setItem("token", res.token)

        setLogged(true);
        setName(res.name)
    }

    const handleSubmitLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

        await login(form.email, form.password)
        onClose();

        } catch (err) {
        console.error(err);
        }
    };

    const handleSubmitRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        try {

        const body = {
                userName: form.userName,
                email: form.email,
                password: form.password,
        }

        await Register(body)

        await login(form.email, form.password)

        onClose();
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
            <form onSubmit={isLogin ? handleSubmitLogin : handleSubmitRegister} className="flex flex-col gap-3">

            {/* NAME */}
            {!isLogin && (
                <div className="form">
                    <label className="text-white text-sm">Name</label>
                    <input
                    name="userName"
                    value={form.userName}
                    onChange={handleChange}
                    placeholder="User..."
                    className="w-full mt-1 p-2 rounded-lg bg-[var(--color-bg-input)] text-white outline-none"
                    />
                </div>
            )}

            {/* EMAIL (solo signup) */}
            <div className="form">
            <label className="text-white text-sm">E-mail</label>
            <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="user@domain.com"
                className="w-full mt-1 p-2 rounded-lg bg-[var(--color-bg-input)] text-white outline-none"
            />
            </div>

            {/* PASSWORD */}
            <div className="form">
                <label className="text-white text-sm">Password</label>
                <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="********"
                className="w-full mt-1 p-2 rounded-lg bg-[var(--color-bg-input)] text-white outline-none"
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