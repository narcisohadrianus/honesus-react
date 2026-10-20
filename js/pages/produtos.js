// Página de Produtos
(function () {
  const { html, useT, href, PageHero } = window.H;

  const GROUP_IDS = ["oilgas", "shipping", "industria"];
  const IMGS = [
    ["assets/p-octg.jpg", "assets/p-drilling.jpg", "assets/p-valvulas.jpg", "assets/p-quimicos.jpg"],
    ["assets/p-quimicos.jpg", "assets/p-epi.jpg", "assets/p-bordo.jpg"],
    ["assets/p-pecas.jpg", "assets/p-valvulas.jpg", "assets/p-lubrificantes.jpg", "assets/p-quimicos.jpg"],
  ];

  function Produtos() {
    const { t } = useT();
    const p = t.productsPage;
    const chips = p.chips.map((c, k) => [c, [...GROUP_IDS, "aluguer"][k]]);

    return html`
      <${PageHero} bg="assets/procurement.jpg" page="produtos" eyebrow=${p.eyebrow} title=${p.title} lead=${p.lead} chips=${chips}/>

      ${p.groups.map((g, gi) => html`<section key=${gi} class=${"section" + (gi % 2 ? " section--soft" : "")} id=${GROUP_IDS[gi]}><div class="container">
        <div class="section-head reveal">
          <div><span class="eyebrow">${g.eyebrow}</span><h2>${g.title}</h2></div>
          <span class="assoc">${g.many ? p.assocMany : p.assocOne} <b>${g.assoc}</b></span>
        </div>
        <div class=${g.items.length === 3 ? "grid-3" : "grid-4"}>
          ${g.items.map(([h, d, note], k) => html`<article key=${k} class="product reveal">
            <div class="media"><img src=${IMGS[gi][k]} alt=${h} loading="lazy"/></div>
            <div class="body"><h3>${h}</h3><p>${d}</p>${note && html`<small>${note}</small>`}
              <a class="link-arrow" href=${href("contactos")}>${t.common.quote} <span>→</span></a></div>
          </article>`)}
        </div>
      </div></section>`)}

      <section class="section section--dark" id="aluguer"><div class="container rent">
        <div class="reveal">
          <span class="eyebrow">${p.rent.eyebrow}</span>
          <h2>${p.rent.title}</h2>
          <p class="lead">${p.rent.lead}</p>
        </div>
        <div class="reveal">
          ${p.rent.items.map(([h, d]) => html`<div key=${h} class="rent-item"><div><h4>${h}</h4><p>${d}</p></div>
            <a class="link-arrow" style=${{ color: "#fff" }} href=${href("contactos")}>${t.common.request} <span>→</span></a></div>`)}
        </div>
      </div></section>

      <section class="section section--soft" style=${{ padding: "72px 0" }}><div class="container section-head" style=${{ margin: 0, alignItems: "center" }}>
        <div><h2>${p.notFound.title}</h2><p class="lead" style=${{ margin: 0 }}>${p.notFound.text}</p></div>
        <div style=${{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <a class="btn btn--primary" href=${href("contactos")}>${t.common.quote} <span class="arrow">→</span></a>
          <a class="btn btn--ghost" href="#">${p.notFound.catalog}</a>
        </div>
      </div></section>`;
  }

  window.H.pages.produtos = Produtos;
})();
