// Página de Serviços
(function () {
  const { html, useT, href, PageHero, SectionHead } = window.H;

  const MEDIA = {
    mecanica: { img: "assets/mecanica.jpg" },
    limpeza: { img: "assets/limpeza.jpg" },
    procurement: { img: "assets/procurement.jpg" },
    chandling: { img: "assets/chandling.jpg" },
    cabotagem: { video: "assets/video-cabotagem.mp4", img: "assets/poster-cabotagem.jpg" },
  };

  function Service({ s, k }) {
    const { t } = useT();
    const p = t.servicesPage;
    const m = MEDIA[s.id];
    // Blocos de 5 itens: 4 em grelha + 1 em largura total; 3 itens: 3 colunas
    const grid = s.subs && s.subs.length === 5 ? [s.subs.slice(0, 4), s.subs.slice(4)] : [s.subs];

    return html`<section class=${"section" + (k % 2 ? " section--soft" : "")} id=${s.id}>
      <div class=${"container svc" + (k % 2 ? " rev" : "")}>
        <div class="reveal">
          <span class="num">0${k + 1}</span>
          <h2>${s.title}</h2>
          <p class="lead">${s.lead}</p>
          ${s.subs && grid.map((g, gi) => html`<div key=${gi} class=${"sub-grid" + (g.length === 3 ? " three" : "")} style=${gi ? { gridTemplateColumns: "1fr", marginTop: "16px" } : null}>
            ${g.map(([h, d]) => html`<div key=${h} class="sub"><h4>${h}</h4><p>${d}</p></div>`)}
          </div>`)}
          ${s.lists && html`<div class="sub-grid">${s.lists.map(([h, items]) => html`<div key=${h} class="sub"><h4>${h}</h4><ul>${items.map(i => html`<li key=${i}>${i}</li>`)}</ul></div>`)}</div>`}
          ${s.assets && html`<p style=${{ marginTop: "26px" }}><span class="eyebrow" style=${{ marginBottom: "6px" }}>${p.assetsLabel}</span><br/>${s.assets}</p>`}
          ${s.id === "procurement" && html`<p style=${{ marginTop: "24px" }}><a class="link-arrow" href=${href("produtos")}>${p.allProducts} <span>→</span></a></p>`}
        </div>
        <aside class="svc-side reveal">
          ${m.video
            ? html`<video src=${m.video} poster=${m.img} muted playsInline loop autoPlay style=${{ borderRadius: "6px", aspectRatio: "3/2", objectFit: "cover", width: "100%" }}></video>`
            : html`<img src=${m.img} alt=${s.imgAlt} loading="lazy"/>`}
          <div class="label">${p.sectorsLabel}</div>
          ${s.tags.map(tag => html`<span key=${tag} class="tag">${tag}</span>`)}<br/>
          <a class="btn btn--primary" href=${href("contactos")}>${t.common.quote} <span class="arrow">→</span></a>
        </aside>
      </div>
    </section>`;
  }

  function Servicos() {
    const { t } = useT();
    const p = t.servicesPage;
    return html`
      <${PageHero} bg="assets/poster-cabotagem.jpg" page="servicos" eyebrow=${p.eyebrow} title=${p.title} lead=${p.lead} chips=${p.list.map(s => [s.chip, s.id])}/>
      ${p.list.map((s, k) => html`<${Service} key=${s.id} s=${s} k=${k}/>`)}
      <section class="section section--soft"><div class="container">
        <${SectionHead} eyebrow=${t.steps.eyebrow} title=${t.steps.title}/>
        <div class="steps">
          ${t.steps.items.map(([h, d], k) => html`<div key=${k} class="step reveal"><b>0${k + 1}</b><h4>${h}</h4><p>${d}</p></div>`)}
        </div>
      </div></section>`;
  }

  window.H.pages.servicos = Servicos;
})();
