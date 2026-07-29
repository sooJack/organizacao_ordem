import { MEMBERS } from '../data/members';
import './Members.css';

const STATUS_CLASS = {
  ativo: 'status-active',
  'em missão': 'status-mission',
  ausente: 'status-away',
};

export default function Members() {
  return (
    <div className="members-page">
      <div className="jp-decor members-jp">組織員</div>

      <h1 className="headline-graffiti members-title">MEMBROS</h1>
      <p className="micro-text members-sub">// agentes registrados na organização ORDEM</p>

      <div className="panel members-table-wrap">
        <table className="members-table">
          <thead>
            <tr>
              <th>Codinome</th>
              <th>Nome</th>
              <th>Patente</th>
              <th>Divisão</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {MEMBERS.map((m) => (
              <tr key={m.id}>
                <td className="members-code">{m.codename}</td>
                <td>{m.name}</td>
                <td>{m.rank}</td>
                <td>{m.division}</td>
                <td>
                  <span className={`status-pill ${STATUS_CLASS[m.status] || ''}`}>
                    {m.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
