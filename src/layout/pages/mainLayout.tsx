import { useState } from 'react';
import AuthModal from '../component/authModal';
import Navbar from '../component/navbar';

export default function MainLayout({ children }: any) {
  const [mode, setMode] = useState<null | 'login' | 'signup'>(null);

  return (
    <>
      <Navbar
        onLogin={() => setMode('login')}
        onSignup={() => setMode('signup')}
      />

      {children}

      {/* MODAL */}
      {mode && (
        <AuthModal
          type={mode}
          onClose={() => setMode(null)}
          switchMode={(m) => setMode(m)}
        />
      )}
    </>
  );
}