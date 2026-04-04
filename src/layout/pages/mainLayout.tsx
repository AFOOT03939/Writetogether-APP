import { useState } from 'react';
import AuthModal from '../component/authModal';
import Navbar from '../component/navbar';

export default function MainLayout({ children }: any) {
  const [mode, setMode] = useState<null | 'login' | 'signup'>(null)
  const [isLogged, setLogged] = useState(!!localStorage.getItem("token"))
  const [name, setName] = useState<string>()

  return (
    <>
      <Navbar
        name={name}
        isLogged={isLogged}
        onLogin={() => setMode('login')}
        onSignup={() => setMode('signup')}
      />

      {children}

      {/* MODAL */}
      {mode && (
        <AuthModal
          setName={setName}
          setLogged={setLogged}
          type={mode}
          onClose={() => setMode(null)}
          switchMode={(m) => setMode(m)}
        />
      )}
    </>
  );
}