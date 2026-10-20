// Página QSSA & Compliance
(function () {
  const { useState } = React;
  const { html, useT, PageHero, SectionHead } = window.H;

  function WhistleForm() {
    const { t } = useT();
    const f = t.qssaPage.whistle.form;
    const [sent, setSent] = useState(false);
    return html`<form class="form reveal" onSubmit=${e => { e.preventDefault(); setSent(true); }}>
      <label for="w-tipo">${f.type}</label>
      <select id="w-tipo">${f.types.map(o => html`<option key=${o}>${o}</option>`)}</select>
      <label for="w-desc">${f.desc}</label>
      <textarea id="w-desc" rows="5" placeholder=${f.descPh}></textarea>
      <div class="row">
        <div><label for="w-nome">${f.name}</label><input id="w-nome"/></div>
        <div><label for="w-contacto">${f.contact}</label><input id="w-contacto"/></div>
      </div>
      <label class="check"><input type="checkbox"/> ${f.anon}</label>
      <button class="btn btn--primary" type="submit" disabled=${sent}>${sent ? f.done : f.submit}${!sent && html` <span class="arrow">→</span>`}</button>
    </form>`;
  }

  function Qssa() {
    const { t } = useT();
    const p = t.qssaPage;
    const ids = ["compromissos", "politicas", "compliance", "denuncias", "fornecedor"];
    const chips = p.chips.map((c, k) => [c, ids[k]]);

    return html`
      <${PageHero} bg="assets/limpeza.jpg" page="qssa" eyebrow=${p.eyebrow} title=${p.title} lead=${p.lead} chips=${chips}/>

      <section class="section" id="compromissos"><div class="container">
        <${SectionHead} eyebrow=${p.commitments.eyebrow} title=${p.commitments.title}/>
        <div class="grid-4">
          ${p.commitments.items.map(([h, d]) => html`<div key=${h} class="card card--top reveal"><h3>${h}</h3><p>${d}</p></div>`)}
        </div>
      </div></section>

      <section class="section section--soft" id="politicas"><div class="container">
        <div class="section-head reveal">
          <div><span class="eyebrow">${p.policies.eyebrow}</span><h2>${p.policies.title}</h2></div>
          <span class="assoc">${p.policies.note}</span>
        </div>
        <div class="table reveal">
          <div class="table-row head"><span>${p.policies.head[0]}</span><span class="meta">${p.policies.head[1]}</span><span>${p.policies.head[2]}</span></div>
          ${p.policies.items.map(([h, d], k) => html`<div key=${k} class="table-row">
            <div><h4>${h}</h4><p>${d}</p></div>
            <span class="meta">${k === p.policies.items.length - 1 ? p.policies.valid : p.policies.meta}</span>
            <a class="btn-pdf" href="#">PDF</a>
          </div>`)}
        </div>
      </div></section>

      <section class="section section--dark" id="compliance"><div class="container two-col">
        <div class="reveal">
          <span class="eyebrow">${p.compliance.eyebrow}</span>
          <h2>${p.compliance.title}</h2>
          <p class="lead">${p.compliance.lead}</p>
          <ul class="checks">${p.compliance.checks.map(c => html`<li key=${c}>${c}</li>`)}</ul>
        </div>
        <div class="reveal">
          ${p.compliance.docs.map(([h, d, btn], k) => html`<div key=${k} class="policy" id=${k === 2 ? "privacidade" : null}>
            <div><h4>${h}</h4><p>${d}</p><small>${p.policies.meta}</small></div>
            <a class="btn-pdf" href="#">${btn}</a>
          </div>`)}
        </div>
      </div></section>

      <section class="section" id="denuncias"><div class="container two-col">
        <div class="reveal">
          <span class="eyebrow">${p.whistle.eyebrow}</span>
          <h2>${p.whistle.title}</h2>
          <p class="lead">${p.whistle.lead}</p>
          <ul class="checks">${p.whistle.checks.map(c => html`<li key=${c}>${c}</li>`)}</ul>
          <p>${p.whistle.alsoEmail} <a class="link-arrow" href="mailto:compliance@honesus.com">compliance@honesus.com</a></p>
        </div>
        <${WhistleForm}/>
      </div></section>

      <section class="section section--soft" id="fornecedor"><div class="container two-col" style=${{ alignItems: "center" }}>
        <div class="reveal">
          <span class="eyebrow">${p.supplier.eyebrow}</span>
          <h2>${p.supplier.title}</h2>
          <p class="lead">${p.supplier.lead}</p>
          <a class="btn btn--dark" href="mailto:compliance@honesus.com?subject=Pacote%20de%20qualifica%C3%A7%C3%A3o">${p.supplier.btn} <span class="arrow">→</span></a>
        </div>
        <div class="kv reveal">
          ${p.supplier.rows.map(([k, v]) => html`<div key=${k}><span>${k}</span><b>${v}</b></div>`)}
        </div>
      </div></section>`;
  }

  window.H.pages.qssa = Qssa;
})();
