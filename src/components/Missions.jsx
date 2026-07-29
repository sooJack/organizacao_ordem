import { useState } from 'react';
import { DAILY_MISSIONS, MAIN_MISSIONS, SIDE_MISSIONS } from '../data/missions';
import './Missions.css';

const STAGE_CLASS = {
  'Em andamento': 'stage-progress',
  Bloqueada: 'stage-blocked',
  'Não iniciada': 'stage-pending',
};

const SIDE_STATUS_CLASS = {
  Disponível: 'side-available',
  Concluída: 'side-done',
};

export default function Missions() {
  const [daily, setDaily] = useState(DAILY_MISSIONS);

  function toggleDaily(id) {
    setDaily((prev) => prev.map((m) => (m.id === id ? { ...m, done: !m.done } : m)));
  }

  return (
    <div className="missions-page">
      <div className="jp-decor missions-jp">任務</div>

      <h1 className="headline-graffiti missions-title">MISSÕES</h1>
      <p className="micro-text missions-sub">// quadro operacional da organização ORDEM</p>

      <section className="missions-section">
        <h2 className="missions-section-title">// Semanais</h2>
        <div className="panel daily-table-wrap">
          <table className="daily-table">
            <thead>
              <tr>
                <th>Feito</th>
                <th>Tarefa</th>
                <th>Recompensa</th>
              </tr>
            </thead>
            <tbody>
              {daily.map((m) => (
                <tr key={m.id} className={m.done ? 'row-done' : ''}>
                  <td>
                    <button className="daily-check" onClick={() => toggleDaily(m.id)}>
                      {m.done ? '✔' : '○'}
                    </button>
                  </td>
                  <td>{m.title}</td>
                  <td className="daily-reward">{m.reward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="missions-section">
        <h2 className="missions-section-title">// Investigação principal</h2>
        <div className="main-missions-list">
          {MAIN_MISSIONS.map((m) => (
            <div key={m.id} className="panel main-mission-card">
              <div className="main-mission-head">
                <span className="stamp">{m.code}</span>
                <span className={`stage-pill ${STAGE_CLASS[m.stage] || ''}`}>{m.stage}</span>
              </div>
              <h3 className="main-mission-title">{m.title}</h3>
              <p className="main-mission-desc">{m.description}</p>
              <div className="progress-track">
                <div className="progress-fill" style={{ width: `${m.progress}%` }} />
              </div>
              <p className="micro-text">{m.progress}% concluído</p>
            </div>
          ))}
        </div>
      </section>

      <section className="missions-section">
        <h2 className="missions-section-title">// Investigações rápidas</h2>
        <div className="side-missions-grid">
          {SIDE_MISSIONS.map((m) => (
            <div key={m.id} className="panel side-mission-card">
              <span className="micro-text">{m.code}</span>
              <h4 className="side-mission-title">{m.title}</h4>
              <div className="side-mission-foot">
                <span className="micro-text">Dificuldade: {m.difficulty}</span>
                <span className={`side-status ${SIDE_STATUS_CLASS[m.status] || ''}`}>
                  {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
