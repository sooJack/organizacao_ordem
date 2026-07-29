import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

export default function Login() {
  const { login, error } = useAuth();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const ok = login(name, password);
    if (!ok) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-jp jp-decor" style={{ top: '8%', left: '4%', fontSize: '9rem' }}>
        秩序
      </div>
      <div className="login-jp jp-decor" style={{ bottom: '4%', right: '2%', fontSize: '6rem' }}>
        機密
      </div>

      <form className={`login-card panel ${shake ? 'shake' : ''}`} onSubmit={handleSubmit}>
        <div className="stamp login-stamp">Confidencial</div>
        <h1 className="headline-graffiti login-title">ORDEM</h1>
        <p className="micro-text login-sub">// sistema de arquivos internos — acesso restrito</p>

        <label className="login-label" htmlFor="name">Nome</label>
        <input
          id="name"
          className="login-input"
          type="text"
          autoComplete="username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ex: admin"
          required
        />

        <label className="login-label" htmlFor="password">Senha</label>
        <input
          id="password"
          className="login-input"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />

        {error && <p className="login-error">⚠ {error}</p>}

        <button type="submit" className="login-btn">ENTRAR NO SISTEMA</button>

        <p className="micro-text login-hint">
          credenciais de teste — nome: admin / senha: ordem2026
        </p>
      </form>
    </div>
  );
}
