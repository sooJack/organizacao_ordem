import { useAuth } from '../context/AuthContext';
import { DAILY_MISSIONS, MAIN_MISSIONS } from '../data/missions';
import './Dashboard.css';

export default function Dashboard() {
  const { user } = useAuth();
  const activeMain = MAIN_MISSIONS.find((m) => m.stage === 'Em andamento');

  return (
    <div className="dashboard">
      <div className="jp-decor dashboard-jp">秩序</div>

      <section className="dashboard-hero panel">
        <span className="stamp">Nível de acesso: {user?.role}</span>
        <h1 className="headline-graffiti dashboard-title">
          BEM-VINDO, <br /> {user?.codename}
        </h1>
        <p className="dashboard-lead">
          Este é o sistema interno da <strong>ORDEM</strong>. Aqui você acompanha o jornal
          com os últimos relatos de campo, consulta o quadro de membros ativos e gerencia
          suas missões — diárias, principais e secundárias — todas registradas neste arquivo.
        </p>
      </section>

      <section className="dashboard-grid">
        <div className="panel dashboard-card">
          <h2 className="dashboard-card-title">// Como usar</h2>
          <ul className="dashboard-list">
            <li><strong>Jornal</strong> — informações recentes e comunicados da organização.</li>
            <li><strong>Membros</strong> — lista de agentes e seu status atual.</li>
            <li><strong>Missões</strong> — diárias, investigação principal e casos rápidos.</li>
            <li>Use o botão <strong>☀/●</strong> para alternar entre tema claro e escuro.</li>
            <li>Use os controles de música para tocar/pausar/mutar o áudio ambiente.</li>
          </ul>
        </div>

        <div className="panel dashboard-card">
          <h2 className="dashboard-card-title">// Investigação principal</h2>
          {activeMain ? (
            <>
              <p className="dashboard-mission-code">{activeMain.code}</p>
              <p className="dashboard-mission-title">{activeMain.title}</p>
              <p className="dashboard-mission-desc">{activeMain.description}</p>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${activeMain.progress}%` }} />
              </div>
              <p className="micro-text">{activeMain.progress}% concluído</p>
            </>
          ) : (
            <p className="dashboard-mission-desc">Nenhuma investigação ativa no momento.</p>
          )}
        </div>

        <div className="panel dashboard-card">
          <h2 className="dashboard-card-title">// Missões diárias de hoje</h2>
          <ul className="dashboard-daily-list">
            {DAILY_MISSIONS.map((m) => (
              <li key={m.id} className={m.done ? 'done' : ''}>
                <span>{m.done ? '✔' : '○'} {m.title}</span>
                <span className="micro-text">{m.reward}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
