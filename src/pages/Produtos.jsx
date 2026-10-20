import { useT } from "../i18n/index.js";
import { href } from "../lib/router.js";
import { PageHero } from "../components/Layout.jsx";

const GROUP_IDS = ["oilgas", "shipping", "industria"];
const IMAGES = [
  ["assets/p-octg.jpg", "assets/p-drilling.jpg", "assets/p-valvulas.jpg", "assets/p-quimicos.jpg"],
  ["assets/p-quimicos.jpg", "assets/p-epi.jpg", "assets/p-bordo.jpg"],
  ["assets/p-pecas.jpg", "assets/p-valvulas.jpg", "assets/p-lubrificantes.jpg", "assets/p-quimicos.jpg"],
];

export default function Produtos() {
  const { t } = useT();
  const p = t.productsPage;
  const chips = p.chips.map((c, k) => [c, [...GROUP_IDS, "aluguer"][k]]);

  return (
    <>
      <PageHero bg="assets/procurement.jpg" page="produtos" eyebrow={p.eyebrow} title={p.title} lead={p.lead} chips={chips} />

      {p.groups.map((g, gi) => (
        <section key={gi} className={"section" + (gi % 2 ? " section--soft" : "")} id={GROUP_IDS[gi]}>
          <div className="container">
            <div className="section-head reveal">
              <div><span className="eyebrow">{g.eyebrow}</span><h2>{g.title}</h2></div>
              <span className="assoc">{g.many ? p.assocMany : p.assocOne} <b>{g.assoc}</b></span>
            </div>
            <div className={g.items.length === 3 ? "grid-3" : "grid-4"}>
              {g.items.map(([h, d, note], k) => (
                <article key={k} className="product reveal">
                  <div className="media"><img src={IMAGES[gi][k]} alt={h} loading="lazy" /></div>
                  <div className="body">
                    <h3>{h}</h3>
                    <p>{d}</p>
                    {note && <small>{note}</small>}
                    <a className="link-arrow" href={href("contactos")}>{t.common.quote} <span>→</span></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section section--dark" id="aluguer">
        <div className="container rent">
          <div className="reveal">
            <span className="eyebrow">{p.rent.eyebrow}</span>
            <h2>{p.rent.title}</h2>
            <p className="lead">{p.rent.lead}</p>
          </div>
          <div className="reveal">
            {p.rent.items.map(([h, d]) => (
              <div key={h} className="rent-item">
                <div><h4>{h}</h4><p>{d}</p></div>
                <a className="link-arrow" style={{ color: "#fff" }} href={href("contactos")}>{t.common.request} <span>→</span></a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--soft" style={{ padding: "72px 0" }}>
        <div className="container section-head" style={{ margin: 0, alignItems: "center" }}>
          <div><h2>{p.notFound.title}</h2><p className="lead" style={{ margin: 0 }}>{p.notFound.text}</p></div>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a className="btn btn--primary" href={href("contactos")}>{t.common.quote} <span className="arrow">→</span></a>
            <a className="btn btn--ghost" href="#">{p.notFound.catalog}</a>
          </div>
        </div>
      </section>
    </>
  );
}
