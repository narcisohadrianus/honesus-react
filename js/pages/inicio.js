// Página inicial
(function () {
  const { html, useT, href, HeroCarousel, SectionHead, Icon } = window.H;

  const SECTOR_IMG = [["assets/poster-oilgas.jpg", href("servicos")], ["assets/chandling.jpg", href("servicos", "chandling")], ["assets/mecanica.jpg", href("servicos", "mecanica")]];
  const SERVICE_IMG = [["assets/mecanica.jpg", "mecanica"], ["assets/limpeza.jpg", "limpeza"], ["assets/procurement.jpg", null], ["assets/chandling.jpg", "chandling"], ["assets/cabotagem.jpg", "cabotagem"]];
  const DOC_ICON = ["shield", "award", "check", "file"];
  const DOC_LINK = [href("qssa", "politicas"), href("qssa", "politicas"), href("qssa", "fornecedor"), href("contactos")];
  const PROJECT_IMG = ["assets/limpeza.jpg", "assets/mecanica.jpg", "assets/cabotagem.jpg"];

  function Inicio() {
    const { t } = useT();
    return html`
      <${HeroCarousel}/>

      <section class="stats"><div class="container">
        ${t.stats.map(([b, s]) => html`<div class="stat" key=${b}><b>${b}</b><span>${s}</span></div>`)}
      </div></section>

      <section class="section section--soft" id="sectores"><div class="container">
        <${SectionHead} eyebrow=${t.sectors.eyebrow} title=${t.sectors.title} lead=${t.sectors.lead}/>
        <div class="grid-3">
          ${t.sectors.items.map((s, k) => html`<a key=${k} class="sector reveal" href=${SECTOR_IMG[k][1]}>
            <img src=${SECTOR_IMG[k][0]} alt=${s.title} loading="lazy"/>
            <div><small>${s.tags}</small><h3>${s.title}</h3><p>${s.text}</p></div>
          </a>`)}
        </div>
      </div></section>

      <section class="section" id="servicos"><div class="container">
        <${SectionHead} eyebrow=${t.servicesHome.eyebrow} title=${t.servicesHome.title} lead=${t.servicesHome.lead}>
          <a class="btn btn--ghost" href=${href("servicos")}>${t.servicesHome.all} <span class="arrow">→</span></a>
        </${SectionHead}>
        <div class="grid-3">
          ${t.servicesHome.items.map((s, k) => html`<article key=${k} class="service-card reveal">
            <div class="media"><img src=${SERVICE_IMG[k][0]} alt="" loading="lazy"/><span class="num">0${k + 1}</span></div>
            <div class="body"><h3>${s.title}</h3><p>${s.text}</p>
              ${SERVICE_IMG[k][1]
                ? html`<a class="link-arrow" href=${href("servicos", SERVICE_IMG[k][1])}>${t.common.learnMore} <span>→</span></a>`
                : html`<a class="link-arrow" href=${href("produtos")}>${t.common.viewProducts} <span>→</span></a>`}
            </div>
          </article>`)}
          <div class="service-cta reveal">
            <div><h3>${t.servicesHome.ctaTitle}</h3><p>${t.servicesHome.ctaText}</p></div>
            <div><a class="btn btn--light" href=${href("contactos")}>${t.servicesHome.ctaBtn} <span class="arrow">→</span></a></div>
          </div>
        </div>
      </div></section>

      <section class="section section--soft"><div class="container">
        <${SectionHead} eyebrow=${t.steps.eyebrow} title=${t.steps.title}/>
        <div class="steps">
          ${t.steps.items.map(([h, p], k) => html`<div key=${k} class="step reveal"><b>0${k + 1}</b><h4>${h}</h4><p>${p}</p></div>`)}
        </div>
      </div></section>

      <section class="section section--dark" id="sobre"><div class="container">
        <div class="about">
          <div class="reveal">
            <span class="eyebrow">${t.about.eyebrow}</span>
            <h2>${t.about.title}</h2>
            <p>${t.about.p1}</p>
            <p>${t.about.p2}</p>
            <div class="pills" style=${{ marginTop: "24px" }}>${t.about.values.map(v => html`<span key=${v} class="pill">${v}</span>`)}</div>
          </div>
          <div class="about-media reveal">
            <img src="assets/equipa.jpg" alt=${t.about.imgAlt} loading="lazy"/>
            <div class="badge"><b>${t.about.badgeTitle}</b>${t.about.badgeText}</div>
          </div>
        </div>
        <div class="mvv">
          ${t.about.mvv.map(([l, p]) => html`<div key=${l} class="mvv-item reveal"><small>${l}</small><p>${p}</p></div>`)}
        </div>
      </div></section>

      <section class="section"><div class="container">
        <${SectionHead} eyebrow=${t.qssaHome.eyebrow} title=${t.qssaHome.title} lead=${t.qssaHome.lead}>
          <a class="btn btn--ghost" href=${href("qssa")}>${t.qssaHome.btn} <span class="arrow">→</span></a>
        </${SectionHead}>
        <div class="grid-4">
          ${t.qssaHome.docs.map(([h, p, l], k) => {
            const I = Icon[DOC_ICON[k]];
            return html`<a key=${k} class="doc reveal" href=${DOC_LINK[k]}><div class="ico"><${I}/></div><h4>${h}</h4><p>${p}</p><span class="link-arrow">${l} <span>→</span></span></a>`;
          })}
        </div>
      </div></section>

      <section class="section section--soft" id="projectos"><div class="container">
        <${SectionHead} eyebrow=${t.projects.eyebrow} title=${t.projects.title}>
          <a class="link-arrow" href="#/inicio/projectos">${t.projects.all} <span>→</span></a>
        </${SectionHead}>
        <div class="grid-3">
          ${t.projects.items.map(([cat, h, p], k) => html`<article key=${k} class="project reveal">
            <div class="media"><img src=${PROJECT_IMG[k]} alt="" loading="lazy"/></div>
            <div class="body"><span class="cat">${cat}</span><h3>${h}</h3><p>${p}</p></div>
          </article>`)}
        </div>
      </div></section>

      <section class="section" style=${{ padding: "72px 0" }}><div class="container">
        <div class="section-head reveal" style=${{ marginBottom: "28px" }}><div><span class="eyebrow">${t.clients.eyebrow}</span><h2 style=${{ fontSize: "1.8rem" }}>${t.clients.title}</h2></div></div>
        <div class="logos reveal">${[0, 1, 2, 3, 4, 5].map(k => html`<div key=${k} class="logo-slot">${t.clients.slot}</div>`)}</div>
      </div></section>`;
  }

  window.H.pages.inicio = Inicio;
})();
