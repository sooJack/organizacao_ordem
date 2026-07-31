import { useEffect, useState } from 'react';
import { WANTED } from '../data/wanted';
import './Wanted.css';

const STATUS_CLASS = {
  'Em procura': 'wanted-searching',
  Achado: 'wanted-found',
};

const FILTERS = ['Todos', 'Em procura', 'Achado'];

export default function Wanted() {
  const [filter, setFilter] = useState('Todos');
  const [selectedTarget, setSelectedTarget] = useState(null);
  const visibleTargets = filter === 'Todos' ? WANTED : WANTED.filter((target) => target.status === filter);

  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setSelectedTarget(null);
    }

    document.addEventListener('keydown', closeOnEscape);
    return () => document.removeEventListener('keydown', closeOnEscape);
  }, []);

  return (
    <div className="wanted-page">
      <div className="jp-decor wanted-jp">指名手配</div>

      <div className="wanted-heading">
        <div>
          <h1 className="headline-graffiti wanted-title">PROCURADOS</h1>
          <p className="micro-text wanted-sub">// alvos sob observação da organização ORDEM</p>
        </div>
        <span className="stamp wanted-stamp">ARQUIVO RESTRITO</span>
      </div>

      <div className="wanted-toolbar">
        <span className="micro-text">STATUS DO ALVO</span>
        <div className="wanted-filters" role="group" aria-label="Filtrar procurados por status">
          {FILTERS.map((option) => (
            <button
              key={option}
              className={`wanted-filter ${filter === option ? 'active' : ''}`}
              onClick={() => setFilter(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="wanted-grid">
        {visibleTargets.map((target) => (
          <article
            className="panel wanted-card"
            key={target.id}
            onClick={() => setSelectedTarget(target)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') setSelectedTarget(target);
            }}
            role="button"
            tabIndex="0"
          >
            <div className="wanted-photo-frame">
              <img src={target.image} alt={`Retrato de ${target.name}`} className="wanted-photo" />
              <div className="wanted-tape wanted-tape-top">ORDEM // NÃO SE APROXIME</div>
              <div className="wanted-tape wanted-tape-bottom">REGISTRO DE CAMPO</div>
              <span className={`wanted-status ${STATUS_CLASS[target.status]}`}>{target.status}</span>
              <span className="wanted-target-code">{target.alias}</span>
            </div>

            <div className="wanted-card-body">
              <div className="wanted-card-heading">
                <h2>{target.name}</h2>
                <strong>{target.reward.toLocaleString('pt-BR')} XP</strong>
              </div>
              <p className="wanted-description">{target.description}</p>
              <div className="wanted-card-foot">
                <span className="micro-text">Último sinal: {target.lastSeen}</span>
                <span className="wanted-reward-label">RECOMPENSA</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {selectedTarget && (
        <div className="wanted-lightbox" onClick={() => setSelectedTarget(null)}>
          <div
            className="wanted-lightbox-content"
            role="dialog"
            aria-label={`Retrato ampliado de ${selectedTarget.name}`}
            aria-modal="true"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="wanted-lightbox-close"
              type="button"
              aria-label="Fechar retrato ampliado"
              onClick={() => setSelectedTarget(null)}
            >
              X
            </button>
            <div className="wanted-photo-frame wanted-photo-frame-large">
              <img
                src={selectedTarget.image}
                alt={`Retrato ampliado de ${selectedTarget.name}`}
                className="wanted-photo"
              />
              <div className="wanted-tape wanted-tape-top">ORDEM // NÃO SE APROXIME</div>
              <div className="wanted-tape wanted-tape-bottom">REGISTRO DE CAMPO</div>
              <span className={`wanted-status ${STATUS_CLASS[selectedTarget.status]}`}>
                {selectedTarget.status}
              </span>
              <span className="wanted-target-code">{selectedTarget.alias}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}