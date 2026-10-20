import { useT } from "../i18n/index.js";
import { href } from "../lib/router.js";
import { PageHero, Steps } from "../components/Layout.jsx";

const MEDIA = {
  mecanica: { img: "assets/servico-mecanica.jpg" },
  limpeza: { img: "assets/servico-limpeza.jpg" },
  procurement: { img: "assets/servico-procurement.jpg" },
  chandling: { img: "assets/chandling.jpg" },
  cabotagem: { img: "assets/poster-cabotagem.jpg", video: "assets/video-cabotagem.mp4" },
};

function Service({ s, index }) {
  const { t } = useT();
  const p = t.servicesPage;
  const media = MEDIA[s.id];
  const alt = index % 2 === 1;
  // 5 sub-serviços: 4 em grelha + 1 em largura total; 3 sub-serviços: 3 colunas
  const groups = s.subs ? (s.subs.length === 5 ? [s.subs.slice(0, 4), s.subs.slice(4)] : [s.subs]) : [];

  return (
    <section className={"section" + (alt ? " section--soft" : "")} id={s.id}>
      <div className={"container svc" + (alt ? " rev" : "")}>
        <div className="reveal">
          <span className="num">0{index + 1}</span>
          <h2>{s.title}</h2>
          <p className="lead">{s.lead}</p>

          {groups.map((g, gi) => (
            <div key={gi} className={"sub-grid" + (g.length === 3 ? " three" : "")}
              style={gi ? { gridTemplateColumns: "1fr", marginTop: 16 } : undefined}>
              {g.map(([h, d]) => <div key={h} className="sub"><h4>{h}</h4><p>{d}</p></div>)}
            </div>
          ))}

          {s.lists && (
            <div className="sub-grid">
              {s.lists.map(([h, items]) => (
                <div key={h} className="sub"><h4>{h}</h4><ul>{items.map(i => <li key={i}>{i}</li>)}</ul></div>
              ))}
            </div>
          )}

          {s.assets && (
            <p style={{ marginTop: 26 }}>
              <span className="eyebrow" style={{ marginBottom: 6 }}>{p.assetsLabel}</span><br />{s.assets}
            </p>
          )}

          {s.id === "procurement" && (
            <p style={{ marginTop: 24 }}><a className="link-arrow" href={href("produtos")}>{p.allProducts} <span>→</span></a></p>
          )}
        </div>

        <aside className="svc-side reveal">
          {media.video
            ? <video src={media.video} poster={media.img} muted playsInline loop autoPlay style={{ borderRadius: 6, aspectRatio: "3/2", objectFit: "cover", width: "100%" }} />
            : <img src={media.img} alt={s.imgAlt} loading="lazy" />}
          <div className="label">{p.sectorsLabel}</div>
          {s.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
          <br />
          <a className="btn btn--primary" href={href("contactos")}>{t.common.quote} <span className="arrow">→</span></a>
        </aside>
      </div>
    </section>
  );
}

export default function Servicos() {
  const { t } = useT();
  const p = t.servicesPage;
  return (
    <>
      <PageHero bg="assets/poster-cabotagem.jpg" page="servicos" eyebrow={p.eyebrow} title={p.title} lead={p.lead}
        chips={p.list.map(s => [s.chip, s.id])} />
      {p.list.map((s, k) => <Service key={s.id} s={s} index={k} />)}
      <Steps />
    </>
  );
}
