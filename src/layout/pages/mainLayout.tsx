import { useState } from 'react';
import AuthModal from '../component/authModal';
import Navbar from '../component/navbar';

export default function MainLayout({ children }: any) {
  const [mode, setMode] = useState<null | 'login' | 'signup'>(null)
  const [isLogged, setLogged] = useState(!!localStorage.getItem("token"))

  return (
    <>
      <Navbar
        isLogged={isLogged}
        onLogin={() => setMode('login')}
        onSignup={() => setMode('signup')}
      />

      {children}

      {/* MODAL */}
      {mode && (
        <AuthModal
          setLogged={setLogged}
          type={mode}
          onClose={() => setMode(null)}
          switchMode={(m) => setMode(m)}
        />
      )}
    </>
  );
}