import { useState } from "react";
import { useT } from "../i18n/index.js";
import { href } from "../lib/router.js";
import HeroCarousel from "../components/HeroCarousel.jsx";
import { SectionHead, Steps } from "../components/Layout.jsx";
import { Icon } from "../components/Icons.jsx";

const SECTORS = [["assets/sector-oilgas.jpg", href("servicos")], ["assets/chandling.jpg", href("servicos", "chandling")], ["assets/sector-industria.jpg", href("servicos", "mecanica")]];
const SERVICES = [["assets/servico-mecanica.jpg", "mecanica"], ["assets/servico-limpeza.jpg", "limpeza"], ["assets/servico-procurement.jpg", null], ["assets/chandling.jpg", "chandling"], ["assets/cabotagem.jpg", "cabotagem"]];
const DOCS = [["shield", href("qssa", "politicas")], ["award", href("qssa", "politicas")], ["check", href("qssa", "fornecedor")], ["file", href("contactos")]];
const CLIENTS = [
  ["totalenergies", "TotalEnergies"], ["carrinho-industria", "Carrinho Indústria"], ["omatapalo", "Omatapalo"],
  ["interoil", "InterOil"], ["carrinho-comercio-logistica", "Carrinho Comércio & Logística"], ["mecwide", "Mecwide"],
  ["somiluana", "Somiluana — Sociedade Mineira"], ["chitotolo", "Sociedade Mineira do Chitotolo"], ["kaixepa", "Sociedade Mineira Kaixepa"],
  ["mat-gov-ao", "Ministério da Administração do Território"], ["catoca", "Sociedade Mineira de Catoca"], ["sonangol-pp", "Sonangol Pesquisa & Produção"],
  ["tecpromic", "TecProMic"], ["grupo-simples", "Grupo Simples"], ["mirempet-gov-ao", "Ministério dos Recursos Minerais, Petróleo e Gás"],
  ["sogepower", "Sogepower"], ["luele", "Luele"], ["smc", "SMC — Sociedade Mineira"],
  ["anpg", "ANPG — Agência Nacional de Petróleo, Gás e Biocombustíveis"],
];
// [frente, verso] — o cartão gira para o verso ao passar o rato (ou ao tocar, em ecrãs táteis)
const PROJECTS = [
  ["assets/servico-limpeza.jpg", "assets/limpeza.jpg"],
  ["assets/servico-mecanica.jpg", "assets/mecanica.jpg"],
  ["assets/projecto-ecoponto.jpg", "assets/projecto-ecoponto-2.jpg"],
];
const canHover = () => window.matchMedia("(hover: hover)").matches;

function ProjectCard({ imgs: [front, back], cat, h, p }) {
  const [flipped, setFlipped] = useState(false);
  // Com rato, o giro é pelo :hover (CSS); o clique/toque só alterna em ecrãs sem hover.
  // Usa data-flipped e não className: o useReveal junta a classe "in" directamente no DOM.
  const toggle = () => { if (!canHover()) setFlipped(f => !f); };
  return (
    <article className="project reveal" data-flipped={flipped || undefined} onClick={toggle} tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setFlipped(f => !f); } }}>
      <div className="media">
        <div className="flip">
          <img className="front" src={front} alt="" loading="lazy" />
          <img className="back" src={back} alt="" loading="lazy" />
        </div>
      </div>
      <div className="body"><span className="cat">{cat}</span><h3>{h}</h3><p>{p}</p></div>
    </article>
  );
}

export default function Inicio() {
  const { t } = useT();
  return (
    <>
      <HeroCarousel />

      <section className="stats">
        <div className="container">
          {t.stats.map(([b, s]) => <div className="stat" key={b}><b>{b}</b><span>{s}</span></div>)}
        </div>
      </section>

      <section className="section section--soft" id="sectores">
        <div className="container">
          <SectionHead eyebrow={t.sectors.eyebrow} title={t.sectors.title} lead={t.sectors.lead} />
          <div className="grid-3">
            {t.sectors.items.map((s, k) => (
              <a key={k} className="sector reveal" href={SECTORS[k][1]}>
                <img src={SECTORS[k][0]} alt={s.title} loading="lazy" />
                <div><small>{s.tags}</small><h3>{s.title}</h3><p>{s.text}</p></div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="servicos">
        <div className="container">
          <SectionHead eyebrow={t.servicesHome.eyebrow} title={t.servicesHome.title} lead={t.servicesHome.lead}>
            <a className="btn btn--ghost" href={href("servicos")}>{t.servicesHome.all} <span className="arrow">→</span></a>
          </SectionHead>
          <div className="grid-3">
            {t.servicesHome.items.map((s, k) => {
              const [img, id] = SERVICES[k];
              return (
                <article key={k} className="service-card reveal">
                  <div className="media"><img src={img} alt="" loading="lazy" /><span className="num">0{k + 1}</span></div>
                  <div className="body">
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                    {id
                      ? <a className="link-arrow" href={href("servicos", id)}>{t.common.learnMore} <span>→</span></a>
                      : <a className="link-arrow" href={href("produtos")}>{t.common.viewProducts} <span>→</span></a>}
                  </div>
                </article>
              );
            })}
            <div className="service-cta reveal">
              <div><h3>{t.servicesHome.ctaTitle}</h3><p>{t.servicesHome.ctaText}</p></div>
              <div><a className="btn btn--light" href={href("contactos")}>{t.servicesHome.ctaBtn} <span className="arrow">→</span></a></div>
            </div>
          </div>
        </div>
      </section>

      <Steps />

      <section className="section section--dark" id="sobre">
        <div className="container">
          <div className="about">
            <div className="reveal">
              <span className="eyebrow">{t.about.eyebrow}</span>
              <h2>{t.about.title}</h2>
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
              <div className="pills" style={{ marginTop: 24 }}>
                {t.about.values.map(v => <span key={v} className="pill">{v}</span>)}
              </div>
            </div>
            <div className="about-media reveal">
              <img src="assets/equipa-honesus.jpg" alt={t.about.imgAlt} loading="lazy" />
              <div className="badge"><b>{t.about.badgeTitle}</b>{t.about.badgeText}</div>
            </div>
          </div>
          <div className="mvv">
            {t.about.mvv.map(([label, text]) => <div key={label} className="mvv-item reveal"><small>{label}</small><p>{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead eyebrow={t.qssaHome.eyebrow} title={t.qssaHome.title} lead={t.qssaHome.lead}>
            <a className="btn btn--ghost" href={href("qssa", "politicas")}>{t.qssaHome.btn} <span className="arrow">→</span></a>
          </SectionHead>
          <div className="grid-4">
            {t.qssaHome.docs.map(([h, p], k) => {
              const I = Icon[DOCS[k][0]];
              return (
                <a key={k} className="doc reveal" href={DOCS[k][1]}>
                  <div className="ico"><I /></div><h4>{h}</h4><p>{p}</p>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="projectos">
        <div className="container">
          <SectionHead eyebrow={t.projects.eyebrow} title={t.projects.title}>
            <a className="link-arrow" href={href("inicio", "projectos")}>{t.projects.all} <span>→</span></a>
          </SectionHead>
          <div className="grid-3">
            {t.projects.items.map(([cat, h, p], k) => <ProjectCard key={k} imgs={PROJECTS[k]} cat={cat} h={h} p={p} />)}
          </div>
        </div>
      </section>

      <section className="section" style={{ padding: "72px 0" }}>
        <div className="container">
          <div className="section-head reveal" style={{ marginBottom: 28 }}>
            <div><span className="eyebrow">{t.clients.eyebrow}</span><h2 style={{ fontSize: "1.8rem" }}>{t.clients.title}</h2></div>
          </div>
          <div className="logos reveal">
            {/* A lista aparece duas vezes para o carrossel rodar sem corte; a cópia é ignorada pelos leitores de ecrã */}
            <div className="logos-track">
              {[0, 1].map(copy => CLIENTS.map(([file, name]) => (
                <div key={copy + file} className="logo-item" aria-hidden={copy === 1 || undefined}>
                  <img src={`assets/clientes/${file}.png`} alt={copy === 0 ? name : ""} loading="lazy" />
                </div>
              )))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
