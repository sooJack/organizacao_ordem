import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';
import MusicPlayer from './MusicPlayer';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Início', end: true },
  { to: '/jornal', label: 'Jornal' },
  { to: '/membros', label: 'Membros' },
  { to: '/procurados', label: 'Procurados' },
  { to: '/missoes', label: 'Missões' },
];

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-top">
        <div className="navbar-brand">
          <span className="headline-graffiti navbar-logo">ORDEM</span>
          <span className="stamp navbar-stamp">Ativo</span>
        </div>

        <MusicPlayer />

        <div className="navbar-actions">
          <ThemeToggle />
          {user && (
            <div className="navbar-user">
              <span className="micro-text">{user.codename} · {user.name}</span>
              <button className="navbar-logout" onClick={logout}>SAIR</button>
            </div>
          )}
        </div>
      </div>

      <nav className="navbar-links">
        {LINKS.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) => 'navbar-link' + (isActive ? ' active' : '')}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
