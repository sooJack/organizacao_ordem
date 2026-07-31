import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import News from './components/News';
import Members from './components/Members';
import Wanted from './components/Wanted';
import Missions from './components/Missions';
import Login from './components/Login';
import './App.css';

function App() {
  const { user, isWelcoming, setIsWelcoming } = useAuth();

  useEffect(() => {
    if (!isWelcoming) return undefined;
    const timeoutId = window.setTimeout(() => setIsWelcoming(false), 12000);
    return () => window.clearTimeout(timeoutId);
  }, [isWelcoming, setIsWelcoming]);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-shell">
      <div className="grain-overlay" />
      <div className="scanlines" />
      <Navbar />

      {isWelcoming && (
        <div className="welcome-overlay" role="status" aria-live="polite">
          <div className="welcome-noise" />
          <div className="welcome-content">
            <span className="welcome-kicker">// conexão autorizada</span>
            <h1 className="welcome-title" data-text="BEM-VINDO AO SISTEMA">BEM-VINDO AO SISTEMA</h1>
            <div className="welcome-loader" aria-hidden="true">
              <span />
            </div>
            <span className="welcome-status">carregando arquivos internos...</span>
          </div>
        </div>
      )}

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/jornal" element={<News />} />
          <Route path="/membros" element={<Members />} />
          <Route path="/procurados" element={<Wanted />} />
          <Route path="/missoes" element={<Missions />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
