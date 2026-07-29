import { NEWS } from '../data/news';
import './News.css';

export default function News() {
  return (
    <div className="news-page">
      <div className="jp-decor news-jp">情報</div>

      <h1 className="headline-graffiti news-title">JORNAL</h1>
      <p className="micro-text news-sub">// informações recentes registradas pela rede de agentes</p>

      <div className="news-list">
        {NEWS.map((n) => (
          <article key={n.id} className="panel news-card">
            <div className="news-card-head">
              <span className="stamp">{n.tag}</span>
              <span className="micro-text">{n.date}</span>
            </div>
            <h2 className="news-card-title">{n.title}</h2>
            <p className="news-card-excerpt">{n.excerpt}</p>
            <p className="micro-text news-card-author">fonte: {n.author}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
