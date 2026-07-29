import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle glitch-hover"
      onClick={toggleTheme}
      title="Alternar tema claro/escuro"
    >
      {theme === 'dark' ? '☀ CLARO' : '● ESCURO'}
    </button>
  );
}
