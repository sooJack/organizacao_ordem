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
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="app-shell">
      <div className="grain-overlay" />
      <div className="scanlines" />
      <Navbar />

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
