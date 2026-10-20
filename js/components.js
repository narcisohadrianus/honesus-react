// Componentes partilhados — React 18 + htm (sintaxe tipo JSX, sem passo de build)
(function () {
  const { useState, useEffect, useRef, useContext, createContext } = React;
  const html = htm.bind(React.createElement);

  // ---------- Idioma ----------
  const LANGS = [["pt", "PT"], ["en", "EN"], ["zh", "中文"]];
  const LangCtx = createContext({ lang: "pt", t: window.HONESUS_I18N.pt, setLang: () => {} });
  const useT = () => useContext(LangCtx);

  // ---------- Router (hash) ----------
  // "#/servicos/cabotagem" -> { page: "servicos", section: "cabotagem" }
  function parseHash() {
    const [page, section] = (location.hash.replace(/^#\/?/, "") || "inicio").split("/");
    return { page: page || "inicio", section: section || null };
  }
  const href = (page, section) => "#/" + page + (section ? "/" + section : "");

  // ---------- Animação de entrada ----------
  function useReveal(deps) {
    useEffect(() => {
      const io = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      }), { threshold: .12 });
      document.querySelectorAll(".reveal:not(.in)").forEach(el => io.observe(el));
      return () => io.disconnect();
    }, deps);
  }

  // ---------- Ícones ----------
  const svg = (d, extra = "") => html`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" dangerouslySetInnerHTML=${{ __html: d + extra }}></svg>`;
  const Icon = {
    home: () => svg('<path d="M3 10.5 12 3l9 7.5V21a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z"/>'),
    pin: () => svg('<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>'),
    phone: () => svg('<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>'),
    mail: () => svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>'),
    clock: () => svg('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>'),
    shield: () => svg('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>'),
    award: () => svg('<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>'),
    check: () => svg('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>'),
    file: () => svg('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M12 18v-6M9 15l3 3 3-3"/>'),
    menu: () => svg('<path d="M4 7h16M4 12h16M4 17h16"/>'),
    close: () => svg('<path d="M6 6l12 12M18 6 6 18"/>'),
    left: () => svg('<path d="m15 18-6-6 6-6"/>'),
    right: () => svg('<path d="m9 18 6-6-6-6"/>'),
    up: () => svg('<path d="m18 15-6-6-6 6"/>'),
    linkedin: () => html`<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9.5h4V21H3zM9.5 9.5h3.8v1.6h.1c.5-1 1.8-2 3.8-2 4 0 4.8 2.6 4.8 6V21h-4v-5.2c0-1.3 0-2.9-1.8-2.9s-2 1.4-2 2.8V21h-4z"/></svg>`,
    instagram: () => svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>'),
  };

  // Símbolo "H" do logotipo (azul #1F4F99 + azul-marinho #2A3C60; branco no rodapé)
  function Mark({ light }) {
    const b = light ? "#8FB0E8" : "#1F4F99", n = light ? "#FFFFFF" : "#2A3C60";
    return html`<svg viewBox="0 0 248 300" fill="none" aria-hidden="true">
      <path d="M229 60 V293" stroke=${n} stroke-width="24"/>
      <path d="M19 60 A105 110 0 0 0 229 60" stroke=${n} stroke-width="24"/>
      <path d="M19 235 A105 110 0 0 1 229 235" stroke=${b} stroke-width="24"/>
      <path d="M19 7 V240" stroke=${b} stroke-width="24"/></svg>`;
  }
  const Brand = ({ light }) => html`<a class="brand" href=${href("inicio")} aria-label="HONESUS"><${Mark} light=${light}/><span class="brand-name">HONESUS</span></a>`;

  // ---------- Header ----------
  function Header({ route }) {
    const { t, lang, setLang } = useT();
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
      const on = () => setScrolled(scrollY > 10);
      addEventListener("scroll", on, { passive: true }); on();
      return () => removeEventListener("scroll", on);
    }, []);
    useEffect(() => setOpen(false), [route.page, route.section]);

    const items = [
      ["home", "inicio", null], ["about", "inicio", "sobre"], ["sectors", "inicio", "sectores"],
      ["services", "servicos", null], ["products", "produtos", null], ["projects", "inicio", "projectos"],
      ["qssa", "qssa", null], ["contacts", "contactos", null],
    ];
    const isActive = (p, s) => route.page === p && (p !== "inicio" || (route.section || null) === s);

    return html`
      <div class="topbar"><div class="container">
        <span class="tagline">${t.topbar.tagline}</span>
        <div class="topbar-right">
          <a class="phone" href="tel:+244923478120">+244 923 478 120</a>
          <a href="mailto:geral@honesus.com">geral@honesus.com</a>
          <div class="lang" role="group" aria-label="Idioma / Language / 语言">
            ${LANGS.map(([code, label]) => html`<button key=${code} class=${lang === code ? "active" : ""} aria-pressed=${lang === code} onClick=${() => setLang(code)}>${label}</button>`)}
          </div>
        </div>
      </div></div>
      <header class=${"header" + (scrolled ? " scrolled" : "")}><div class="container">
        <${Brand}/>
        <nav class=${"nav" + (open ? " open" : "")}>
          ${items.map(([key, p, s]) => html`<a key=${key} href=${href(p, s)} class=${(isActive(p, s) ? "active " : "") + (key === "home" ? "nav-home" : "")}>${key === "home" ? html`<${Icon.home}/>` : null}${t.nav[key]}</a>`)}
        </nav>
        <a class="btn btn--primary" href=${href("contactos")}>${t.nav.quote} <span class="arrow">→</span></a>
        <button class="menu-toggle" aria-label=${t.nav.menu} aria-expanded=${open} onClick=${() => setOpen(!open)}>${open ? html`<${Icon.close}/>` : html`<${Icon.menu}/>`}</button>
      </div></header>`;
  }

  // ---------- Carrossel de vídeos ----------
  const SLIDES = [
    { video: "assets/video-cabotagem.mp4", poster: "assets/poster-cabotagem.jpg", cta1: href("servicos", "cabotagem"), cta2: href("contactos") },
    { video: "assets/video-oilgas.mp4", poster: "assets/poster-oilgas.jpg", cta1: href("servicos"), cta2: href("produtos") },
  ];
  function HeroCarousel() {
    const { t } = useT();
    const [i, setI] = useState(0);
    const vids = useRef([]);
    const DUR = 8000;
    useEffect(() => {
      vids.current.forEach((v, k) => { if (!v) return; if (k === i) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause(); });
      const id = setTimeout(() => setI((i + 1) % SLIDES.length), DUR);
      return () => clearTimeout(id);
    }, [i]);
    const go = n => setI((n + SLIDES.length) % SLIDES.length);

    return html`<section class="hero" aria-roledescription="carousel">
      ${SLIDES.map((s, k) => {
        const c = t.hero[k];
        return html`<div key=${k} class=${"slide" + (k === i ? " active" : "")} aria-hidden=${k !== i}>
          <img src=${s.poster} alt="" />
          <video ref=${el => (vids.current[k] = el)} src=${s.video} poster=${s.poster} muted playsInline loop preload="auto"></video>
          <div class="slide-content container">
            <span class="eyebrow">${c.eyebrow}</span>
            <h1>${c.title}</h1>
            <p>${c.text}</p>
            <div class="hero-actions">
              <a class="btn btn--primary" href=${s.cta1}>${c.cta1} <span class="arrow">→</span></a>
              <a class="btn btn--outline" href=${s.cta2}>${c.cta2}</a>
            </div>
          </div>
        </div>`;
      })}
      <div class="hero-controls"><div class="container">
        <div class="hero-tabs">
          ${SLIDES.map((_, k) => html`<button key=${k + "-" + i} class=${"hero-tab" + (k === i ? " active" : "")} style=${{ "--dur": DUR + "ms" }} onClick=${() => go(k)}>
            <span class="bar"><i></i></span><small>0${k + 1}</small><strong>${t.hero[k].tab}</strong></button>`)}
        </div>
        <div class="hero-arrows">
          <button class="hero-arrow" aria-label=${t.common.prev} onClick=${() => go(i - 1)}><${Icon.left}/></button>
          <button class="hero-arrow" aria-label=${t.common.next} onClick=${() => go(i + 1)}><${Icon.right}/></button>
        </div>
      </div></div>
    </section>`;
  }

  // ---------- Cabeçalho das páginas internas ----------
  function PageHero({ bg, eyebrow, title, lead, chips, page }) {
    const { t } = useT();
    return html`<section class="page-hero">
      <div class="bg" style=${{ backgroundImage: `url(${bg})` }}></div>
      <div class="container">
        <div class="crumbs"><a href=${href("inicio")}>${t.common.home}</a> / ${eyebrow}</div>
        <span class="eyebrow">${eyebrow}</span>
        <h1>${title}</h1>
        <p>${lead}</p>
        ${chips && html`<div class="chips">${chips.map(([label, id]) => html`<a key=${id} class="chip" href=${href(page, id)}>${label}</a>`)}</div>`}
      </div>
    </section>`;
  }

  const SectionHead = ({ eyebrow, title, lead, children }) => html`
    <div class="section-head reveal"><div>
      ${eyebrow && html`<span class="eyebrow">${eyebrow}</span>`}
      <h2>${title}</h2>
      ${lead && html`<p class="lead">${lead}</p>`}
    </div>${children}</div>`;

  // ---------- Faixa de cotação + rodapé ----------
  function CtaBand() {
    const { t } = useT();
    return html`<section class="cta-band"><div class="container">
      <div><h2>${t.cta.title}</h2><p>${t.cta.text}</p></div>
      <div class="actions">
        <a class="btn btn--light" href=${href("contactos")}>${t.cta.btn} <span class="arrow">→</span></a>
        <a class="mail" href="mailto:geral@honesus.com">geral@honesus.com</a>
      </div>
    </div></section>`;
  }

  function Footer() {
    const { t } = useT();
    const svc = t.servicesPage.list;
    return html`<footer class="footer">
      <div class="container footer-grid">
        <div>
          <${Brand} light/>
          <p class="about-txt">${t.footer.about}</p>
          <div class="social">
            <a href="#" aria-label="LinkedIn"><${Icon.linkedin}/></a>
            <a href="#" aria-label="Instagram"><${Icon.instagram}/></a>
          </div>
        </div>
        <div><h5>${t.footer.company}</h5><ul>
          <li><a href=${href("inicio")}>${t.nav.home}</a></li>
          <li><a href=${href("inicio", "sobre")}>${t.nav.about}</a></li>
          <li><a href=${href("inicio", "sectores")}>${t.nav.sectors}</a></li>
          <li><a href=${href("produtos")}>${t.nav.products}</a></li>
          <li><a href=${href("qssa")}>${t.nav.qssa}</a></li>
          <li><a href=${href("contactos")}>${t.nav.contacts}</a></li>
        </ul></div>
        <div><h5>${t.footer.services}</h5><ul>
          ${svc.map(s => html`<li key=${s.id}><a href=${href("servicos", s.id)}>${s.chip}</a></li>`)}
        </ul></div>
        <div><h5>${t.footer.contacts}</h5>
          <div class="contact-line"><${Icon.pin}/><span>Condomínio Boulevard, Prédio 1, 5.º Andar<br/>Patriota — Luanda, Angola</span></div>
          <div class="contact-line"><${Icon.phone}/><a href="tel:+244923478120">+244 923 478 120</a></div>
          <div class="contact-line"><${Icon.mail}/><a href="mailto:geral@honesus.com">geral@honesus.com</a></div>
          <div class="contact-line"><${Icon.linkedin}/><span><a href="#">LinkedIn</a> · <a href="#">Instagram</a></span></div>
        </div>
      </div>
      <div class="footer-bottom"><div class="container">
        <span>${t.footer.rights}</span>
        <a href=${href("qssa", "privacidade")}>${t.footer.privacy}</a>
      </div></div>
    </footer>`;
  }

  function ToTop() {
    const { t } = useT();
    const [show, setShow] = useState(false);
    useEffect(() => {
      const on = () => setShow(scrollY > 600);
      addEventListener("scroll", on, { passive: true });
      return () => removeEventListener("scroll", on);
    }, []);
    return html`<button class=${"to-top" + (show ? " show" : "")} aria-label=${t.common.toTop} onClick=${() => scrollTo({ top: 0, behavior: "smooth" })}><${Icon.up}/></button>`;
  }

  window.H = { html, LANGS, LangCtx, useT, parseHash, href, useReveal, Icon, Mark, Brand, Header, HeroCarousel, PageHero, SectionHead, CtaBand, Footer, ToTop, pages: {} };
})();
