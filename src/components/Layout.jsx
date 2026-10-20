// Blocos de página reutilizáveis: cabeçalho interno, títulos de secção, faixa de cotação, rodapé, voltar ao topo
import { useEffect, useState } from "react";
import { useT } from "../i18n/index.js";
import { href } from "../lib/router.js";
import { Brand } from "./Brand.jsx";
import { Icon } from "./Icons.jsx";

// Redes sociais da HONESUS (rodapé e página Contactos)
export const LINKEDIN = "https://www.linkedin.com/company/honesus-lda/";
export const INSTAGRAM = "https://www.instagram.com/honesuslda/";
const EXT = { target: "_blank", rel: "noopener noreferrer" };

export function PageHero({ bg, page, eyebrow, title, lead, chips }) {
  const { t } = useT();
  return (
    <section className="page-hero">
      <div className="bg" style={{ backgroundImage: `url(${bg})` }} />
      <div className="container">
        <div className="crumbs"><a href={href("inicio")}>{t.common.home}</a> / {eyebrow}</div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{lead}</p>
        {chips && (
          <div className="chips">
            {chips.map(([label, id]) => <a key={id} className="chip" href={href(page, id)}>{label}</a>)}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHead({ eyebrow, title, lead, children }) {
  return (
    <div className="section-head reveal">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      {children}
    </div>
  );
}

export function Steps() {
  const { t } = useT();
  return (
    <section className="section section--soft">
      <div className="container">
        <SectionHead eyebrow={t.steps.eyebrow} title={t.steps.title} />
        <div className="steps">
          {t.steps.items.map(([h, p], k) => (
            <div key={k} className="step reveal"><b>0{k + 1}</b><h4>{h}</h4><p>{p}</p></div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaBand() {
  const { t } = useT();
  return (
    <section className="cta-band">
      <div className="container">
        <div><h2>{t.cta.title}</h2><p>{t.cta.text}</p></div>
        <div className="actions">
          <a className="btn btn--light" href={href("contactos")}>{t.cta.btn} <span className="arrow">→</span></a>
          <a className="mail" href="mailto:geral@honesus.com">geral@honesus.com</a>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const { t } = useT();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Brand light />
          <p className="about-txt">{t.footer.about}</p>
          <div className="social">
            <a href={LINKEDIN} {...EXT} aria-label="LinkedIn"><Icon.linkedin /></a>
            <a href={INSTAGRAM} {...EXT} aria-label="Instagram"><Icon.instagram /></a>
          </div>
        </div>
        <div>
          <h5>{t.footer.company}</h5>
          <ul>
            <li><a href={href("inicio")}>{t.nav.home}</a></li>
            <li><a href={href("inicio", "sobre")}>{t.nav.about}</a></li>
            <li><a href={href("inicio", "sectores")}>{t.nav.sectors}</a></li>
            <li><a href={href("produtos")}>{t.nav.products}</a></li>
            <li><a href={href("qssa")}>{t.nav.qssa}</a></li>
            <li><a href={href("contactos")}>{t.nav.contacts}</a></li>
          </ul>
        </div>
        <div>
          <h5>{t.footer.services}</h5>
          <ul>
            {t.servicesPage.list.map(s => <li key={s.id}><a href={href("servicos", s.id)}>{s.chip}</a></li>)}
          </ul>
        </div>
        <div>
          <h5>{t.footer.contacts}</h5>
          <div className="contact-line"><Icon.pin /><span>Condomínio Boulevard, Prédio 1, 5.º Andar<br />Patriota — Luanda, Angola</span></div>
          <div className="contact-line"><Icon.phone /><a href="tel:+244929179252">+244 929 179 252</a></div>
          <div className="contact-line"><Icon.mail /><a href="mailto:geral@honesus.com">geral@honesus.com</a></div>
          <div className="contact-line"><Icon.linkedin /><span><a href={LINKEDIN} {...EXT}>LinkedIn</a> · <a href={INSTAGRAM} {...EXT}>Instagram</a></span></div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <span>{t.footer.rights}</span>
          <a href={href("qssa", "privacidade")}>{t.footer.privacy}</a>
        </div>
      </div>
    </footer>
  );
}

export function ToTop() {
  const { t } = useT();
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button className={"to-top" + (show ? " show" : "")} aria-label={t.common.toTop} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
      <Icon.up />
    </button>
  );
}
