// Página de Contactos
(function () {
  const { useState } = React;
  const { html, useT, href, PageHero, Icon } = window.H;

  const ADDRESS = "Condomínio Boulevard, Prédio 1, 5.º Andar, Patriota, Luanda, Angola";
  const MAP_EMBED = "https://maps.google.com/maps?q=" + encodeURIComponent("Condomínio Boulevard Patriota Luanda Angola") + "&z=15&output=embed";
  const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);

  function ContactForm() {
    const { t } = useT();
    const f = t.contactPage.form;
    const [v, setV] = useState({ name: "", company: "", email: "", phone: "", subject: 0, message: "", consent: false });
    const [status, setStatus] = useState(null); // null | "error" | "ok"
    const set = k => e => setV({ ...v, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

    // Sem servidor: abre o cliente de e-mail do visitante com a mensagem já preenchida para geral@honesus.com
    function submit(e) {
      e.preventDefault();
      if (!v.name.trim() || !v.email.trim() || !v.message.trim() || !v.consent) { setStatus("error"); return; }
      const subject = `[Site] ${f.subjects[v.subject]} — ${v.name}${v.company ? " (" + v.company + ")" : ""}`;
      const body = `${f.name}: ${v.name}\n${f.company}: ${v.company}\n${f.email}: ${v.email}\n${f.phone}: ${v.phone}\n\n${v.message}`;
      location.href = `mailto:geral@honesus.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      setStatus("ok");
    }

    return html`<form class="form reveal" onSubmit=${submit} noValidate>
      <span class="eyebrow">${f.eyebrow}</span>
      <h2 style=${{ fontSize: "1.8rem" }}>${f.title}</h2>
      <p class="lead" style=${{ fontSize: "1rem", marginBottom: "24px" }}>${f.lead}</p>
      <div class="row">
        <div><label class="req" for="c-name">${f.name}</label><input id="c-name" value=${v.name} onInput=${set("name")} autoComplete="name"/></div>
        <div><label for="c-company">${f.company}</label><input id="c-company" value=${v.company} onInput=${set("company")} autoComplete="organization"/></div>
      </div>
      <div class="row">
        <div><label class="req" for="c-email">${f.email}</label><input id="c-email" type="email" value=${v.email} onInput=${set("email")} autoComplete="email"/></div>
        <div><label for="c-phone">${f.phone}</label><input id="c-phone" type="tel" value=${v.phone} onInput=${set("phone")} autoComplete="tel"/></div>
      </div>
      <label for="c-subject">${f.subject}</label>
      <select id="c-subject" value=${v.subject} onChange=${set("subject")}>${f.subjects.map((s, k) => html`<option key=${k} value=${k}>${s}</option>`)}</select>
      <label class="req" for="c-msg">${f.message}</label>
      <textarea id="c-msg" rows="6" placeholder=${f.messagePh} value=${v.message} onInput=${set("message")}></textarea>
      <label class="check"><input type="checkbox" checked=${v.consent} onChange=${set("consent")}/> <span>${f.consent}</span></label>
      ${status === "error" && html`<p class="error" role="alert">${f.required}</p>`}
      <button class="btn btn--primary" type="submit">${f.submit} <span class="arrow">→</span></button>
      ${status === "ok" && html`<p class="ok" role="status">${f.done}</p>`}
    </form>`;
  }

  function Contactos() {
    const { t } = useT();
    const p = t.contactPage;
    const cards = [
      ["pin", p.cards.address, html`<p>Condomínio Boulevard, Prédio 1, 5.º Andar<br/>Patriota — Luanda, Angola</p>`],
      ["phone", p.cards.phone, html`<a href="tel:+244923478120">+244 923 478 120</a>`],
      ["mail", p.cards.email, html`<a href="mailto:geral@honesus.com">geral@honesus.com</a><br/><a href="mailto:compliance@honesus.com" style=${{ fontWeight: 400, fontSize: ".92rem" }}>compliance@honesus.com</a>`],
      ["clock", p.cards.hours, html`<p>${p.cards.hoursText}</p>`],
    ];

    return html`
      <${PageHero} bg="assets/equipa.jpg" page="contactos" eyebrow=${p.eyebrow} title=${p.title} lead=${p.lead}/>

      <section class="section" style=${{ paddingTop: 0 }}><div class="container">
        <div class="contact-cards">
          ${cards.map(([ico, label, body]) => {
            const I = Icon[ico];
            return html`<div key=${ico} class="c-card"><div class="ico"><${I}/></div><small>${label}</small>${body}</div>`;
          })}
        </div>

        <div class="contact-grid" style=${{ marginTop: "72px" }}>
          <${ContactForm}/>
          <div class="reveal">
            <div class="map-card">
              <iframe src=${MAP_EMBED} title=${p.map.title} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
              <div class="body">
                <h3>${p.map.title}</h3>
                <p>${p.map.lead}</p>
                <a class="link-arrow" href=${MAP_LINK} target="_blank" rel="noopener">${p.map.open} <span>→</span></a>
                <div class="social-row">
                  <strong style=${{ color: "var(--ink)", marginRight: "6px" }}>${p.social}</strong>
                  <a href="#" aria-label="LinkedIn"><${Icon.linkedin}/></a>
                  <a href="#" aria-label="Instagram"><${Icon.instagram}/></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div></section>`;
  }

  window.H.pages.contactos = Contactos;
})();
