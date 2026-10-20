import { useEffect, useState } from "react";
import { LANGS, useT } from "../i18n/index.js";
import { href } from "../lib/router.js";
import { Brand } from "./Brand.jsx";
import { Icon } from "./Icons.jsx";

const NAV = [
  ["home", "inicio", null], ["about", "inicio", "sobre"], ["sectors", "inicio", "sectores"],
  ["services", "servicos", null], ["products", "produtos", null], ["projects", "inicio", "projectos"],
  ["qssa", "qssa", null], ["contacts", "contactos", null],
];

export default function Header({ route }) {
  const { t, lang, setLang } = useT();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fecha o menu móvel ao mudar de página
  useEffect(() => setOpen(false), [route.page, route.section]);

  const isActive = (page, section) =>
    route.page === page && (page !== "inicio" || (route.section || null) === section);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span className="tagline">{t.topbar.tagline}</span>
          <div className="topbar-right">
            <a className="phone" href="tel:+244929179252">+244 929 179 252</a>
            <a href="mailto:geral@honesus.com">geral@honesus.com</a>
            <div className="lang" role="group" aria-label="Idioma / Language / 语言">
              {LANGS.map(([code, label]) => (
                <button key={code} className={lang === code ? "active" : ""} aria-pressed={lang === code} onClick={() => setLang(code)}>
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header className={"header" + (scrolled ? " scrolled" : "")}>
        <div className="container">
          <Brand />
          <nav className={"nav" + (open ? " open" : "")}>
            {NAV.map(([key, page, section]) => (
              <a key={key} href={href(page, section)}
                className={[isActive(page, section) && "active", key === "home" && "nav-home"].filter(Boolean).join(" ")}>
                {key === "home" && <Icon.home />}
                {t.nav[key]}
              </a>
            ))}
          </nav>
          <a className="btn btn--primary" href={href("contactos")}>{t.nav.quote} <span className="arrow">→</span></a>
          <button className="menu-toggle" aria-label={t.nav.menu} aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <Icon.close /> : <Icon.menu />}
          </button>
        </div>
      </header>
    </>
  );
}
