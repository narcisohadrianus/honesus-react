import { useState } from "react";
import { useT } from "../i18n/index.js";
import { INSTAGRAM, LINKEDIN, PageHero } from "../components/Layout.jsx";
import { Icon } from "../components/Icons.jsx";
import { hasEndpoint, openMail, sendForm } from "../lib/sendForm.js";

const ADDRESS = "Condomínio Boulevard, Prédio 1, 5.º Andar, Patriota, Luanda, Angola";
const MAP_EMBED = "https://maps.google.com/maps?q=" + encodeURIComponent("Condomínio Boulevard Patriota Luanda Angola") + "&z=15&output=embed";
const MAP_LINK = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(ADDRESS);
const EMPTY = { name: "", company: "", email: "", phone: "", subject: "0", message: "", consent: false };

function ContactForm() {
  const { t, lang } = useT();
  const f = t.contactPage.form;
  const [v, setV] = useState(EMPTY);
  const [status, setStatus] = useState(null); // null | "error" | "sending" | "ok" | "mail" | "failed"

  const set = key => e => setV({ ...v, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  // Envia para geral@honesus.com pelo FormSubmit (ver lib/sendForm.js); sem serviço, abre o e-mail do visitante.
  async function submit(e) {
    e.preventDefault();
    if (e.target.elements._honey?.value) { setStatus("ok"); return; } // campo-armadilha preenchido = robô
    if (!v.name.trim() || !/^\S+@\S+\.\S+$/.test(v.email.trim()) || !v.message.trim() || !v.consent) { setStatus("error"); return; }
    const subject = `[Site] ${f.subjects[Number(v.subject)]} — ${v.name}${v.company ? ` (${v.company})` : ""}`;
    const body = `${f.name}: ${v.name}\n${f.company}: ${v.company}\n${f.email}: ${v.email}\n${f.phone}: ${v.phone}\n\n${v.message}`;
    if (!hasEndpoint("contact")) { openMail("geral@honesus.com", subject, body); setStatus("mail"); return; }
    setStatus("sending");
    try {
      // Campos em português no e-mail recebido, qualquer que seja o idioma do visitante
      await sendForm("contact", {
        _subject: subject, _template: "table", _captcha: "false", _replyto: v.email.trim(),
        Nome: v.name.trim(), Empresa: v.company.trim() || "—", "E-mail": v.email.trim(), Telefone: v.phone.trim() || "—",
        Assunto: f.subjects[Number(v.subject)], Mensagem: v.message.trim(), Idioma: lang.toUpperCase(),
      });
      setV(EMPTY);
      setStatus("ok");
    } catch {
      setStatus("failed");
    }
  }

  // Confirmação de envio: substitui o formulário por um painel bem visível
  if (status === "ok") return (
    <div className="form form-sent reveal in" role="status" aria-live="polite">
      <div className="sent-icon"><Icon.check /></div>
      <h2>{f.sentTitle}</h2>
      <p>{f.sentText}</p>
      <button type="button" className="btn btn--dark" onClick={() => setStatus(null)}>{f.sentAgain}</button>
    </div>
  );

  return (
    <form className="form reveal" onSubmit={submit} noValidate>
      {/* Campo-armadilha invisível: as pessoas não o vêem, os robôs de spam preenchem-no */}
      <input type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px" }} />
      <span className="eyebrow">{f.eyebrow}</span>
      <h2 style={{ fontSize: "1.8rem" }}>{f.title}</h2>
      <p className="lead" style={{ fontSize: "1rem", marginBottom: 24 }}>{f.lead}</p>
      <div className="row">
        <div><label className="req" htmlFor="c-name">{f.name}</label><input id="c-name" value={v.name} onChange={set("name")} autoComplete="name" /></div>
        <div><label htmlFor="c-company">{f.company}</label><input id="c-company" value={v.company} onChange={set("company")} autoComplete="organization" /></div>
      </div>
      <div className="row">
        <div><label className="req" htmlFor="c-email">{f.email}</label><input id="c-email" type="email" value={v.email} onChange={set("email")} autoComplete="email" /></div>
        <div><label htmlFor="c-phone">{f.phone}</label><input id="c-phone" type="tel" value={v.phone} onChange={set("phone")} autoComplete="tel" /></div>
      </div>
      <label htmlFor="c-subject">{f.subject}</label>
      <select id="c-subject" value={v.subject} onChange={set("subject")}>
        {f.subjects.map((s, k) => <option key={k} value={String(k)}>{s}</option>)}
      </select>
      <label className="req" htmlFor="c-msg">{f.message}</label>
      <textarea id="c-msg" rows={6} placeholder={f.messagePh} value={v.message} onChange={set("message")} />
      <label className="check"><input type="checkbox" checked={v.consent} onChange={set("consent")} /> <span>{f.consent}</span></label>
      {status === "error" && <p className="error" role="alert">{f.required}</p>}
      <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? f.sending : <>{f.submit} <span className="arrow">→</span></>}
      </button>
      {status === "mail" && <p className="ok" role="status">{f.doneMail}</p>}
      {status === "failed" && <p className="error" role="alert">{f.failed} <a href="mailto:geral@honesus.com">geral@honesus.com</a></p>}
    </form>
  );
}

export default function Contactos() {
  const { t } = useT();
  const p = t.contactPage;
  const cards = [
    ["pin", p.cards.address, <p>Condomínio Boulevard, Prédio 1, 5.º Andar<br />Patriota — Luanda, Angola</p>],
    ["phone", p.cards.phone, <a href="tel:+244929179252">+244 929 179 252</a>],
    ["mail", p.cards.email, <><a href="mailto:geral@honesus.com">geral@honesus.com</a><br /><a href="mailto:compliance@honesus.com" style={{ fontWeight: 400, fontSize: ".92rem" }}>compliance@honesus.com</a></>],
    ["clock", p.cards.hours, <p>{p.cards.hoursText}</p>],
  ];

  return (
    <>
      <PageHero bg="assets/equipa.jpg" page="contactos" eyebrow={p.eyebrow} title={p.title} lead={p.lead} />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contact-cards">
            {cards.map(([icon, label, body]) => {
              const I = Icon[icon];
              return <div key={icon} className="c-card"><div className="ico"><I /></div><small>{label}</small>{body}</div>;
            })}
          </div>

          <div className="contact-grid" style={{ marginTop: 72 }}>
            <ContactForm />
            <div className="reveal">
              <div className="map-card">
                <iframe src={MAP_EMBED} title={p.map.title} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
                <div className="body">
                  <h3>{p.map.title}</h3>
                  <p>{p.map.lead}</p>
                  <a className="link-arrow" href={MAP_LINK} target="_blank" rel="noopener noreferrer">{p.map.open} <span>→</span></a>
                  <div className="social-row">
                    <strong style={{ color: "var(--ink)", marginRight: 6 }}>{p.social}</strong>
                    <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><Icon.linkedin /></a>
                    <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Icon.instagram /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
