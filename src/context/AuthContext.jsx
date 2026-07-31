import { createContext, useContext, useState } from 'react';
import { USERS } from '../data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('ordem_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [error, setError] = useState('');
  const [isWelcoming, setIsWelcoming] = useState(false);

  function login(name, password) {
    const found = USERS.find(
      (u) =>
        u.name.toLowerCase() === name.trim().toLowerCase() &&
        import.meta.env[u.passwordKey] === password,
    );

    if (found) {
      setUser(found);
      setError('');
      setIsWelcoming(true);
      sessionStorage.setItem('ordem_user', JSON.stringify(found));
      return true;
    }

    setError('Credenciais inválidas. Acesso negado.');
    return false;
  }

  function logout() {
    setUser(null);
    setIsWelcoming(false);
    sessionStorage.removeItem('ordem_user');
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, error, isWelcoming, setIsWelcoming }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth deve ser usado dentro de AuthProvider');
  return ctx;
}
