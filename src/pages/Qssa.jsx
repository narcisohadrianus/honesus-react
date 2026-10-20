import { useState } from "react";
import { useT } from "../i18n/index.js";
import { PageHero, SectionHead } from "../components/Layout.jsx";
import { hasEndpoint, openMail, sendForm } from "../lib/sendForm.js";
import DocViewer from "../components/DocViewer.jsx";

// Certificados em public/assets/certificados/ — [ficheiro, válido até]; títulos e entidades em i18n (qssaPage.certs.items)
const CERTS = [
  ["iso-9001-2015", "21/07/2028"], ["iso-14001-2015", "21/07/2028"], ["iso-45001-2018", "21/07/2028"],
  ["anpg", "12/07/2028"], ["mirempet", "22/07/2028"],
];
// Documentos de compliance em public/assets/documentos/<ficheiro>.pdf (+ .jpg de miniatura).
// null = PDF ainda não publicado: o visualizador mostra o aviso com o contacto de compliance.
// Ordem: Código de Conduta e Ética · Política Anticorrupção · Política de Privacidade
const COMPLIANCE_FILES = [null, "politica-anticorrupcao", "politica-privacidade"];
// Políticas QSSA (tabela "Políticas e certificados"), na mesma pasta e com a mesma regra (null = ainda sem PDF).
// Ordem: Política QSSA · Stop Work · Álcool e Drogas · Conteúdo Local
const POLICY_FILES = [null, null, null, null];
const SECTION_IDS = ["compromissos", "politicas", "compliance", "denuncias", "fornecedor"];

const EMPTY = { type: "0", desc: "", name: "", contact: "", anon: false };

function WhistleForm() {
  const { t } = useT();
  const f = t.qssaPage.whistle.form;
  const [v, setV] = useState(EMPTY);
  const [status, setStatus] = useState(null); // null | "error" | "sending" | "ok" | "mail" | "failed"

  const set = key => e => setV({ ...v, [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value });

  // Envia pelo serviço configurado em VITE_FORM_WHISTLE; sem ele, abre o e-mail para compliance@honesus.com.
  // Com "anonimato" marcado, o nome e o contacto não são enviados.
  async function submit(e) {
    e.preventDefault();
    if (!v.desc.trim()) { setStatus("error"); return; }
    const type = f.types[Number(v.type)];
    const name = v.anon ? "" : v.name;
    const contact = v.anon ? "" : v.contact;
    const subject = `[Denúncia] ${type}`;
    if (!hasEndpoint("whistle")) {
      openMail("compliance@honesus.com", subject, `${f.type}: ${type}\n${f.name}: ${name}\n${f.contact}: ${contact}\n\n${v.desc}`);
      setStatus("mail");
      return;
    }
    setStatus("sending");
    try {
      await sendForm("whistle", { _subject: subject, type, description: v.desc, name, contact, anonymous: v.anon });
      setV(EMPTY);
      setStatus("ok");
    } catch {
      setStatus("failed");
    }
  }

  return (
    <form className="form reveal" onSubmit={submit} noValidate>
      <label htmlFor="w-tipo">{f.type}</label>
      <select id="w-tipo" value={v.type} onChange={set("type")}>{f.types.map((o, k) => <option key={o} value={String(k)}>{o}</option>)}</select>
      <label className="req" htmlFor="w-desc">{f.desc}</label>
      <textarea id="w-desc" rows={5} placeholder={f.descPh} value={v.desc} onChange={set("desc")} />
      <div className="row">
        <div><label htmlFor="w-nome">{f.name}</label><input id="w-nome" value={v.anon ? "" : v.name} onChange={set("name")} disabled={v.anon} /></div>
        <div><label htmlFor="w-contacto">{f.contact}</label><input id="w-contacto" value={v.anon ? "" : v.contact} onChange={set("contact")} disabled={v.anon} /></div>
      </div>
      <label className="check"><input type="checkbox" checked={v.anon} onChange={set("anon")} /> {f.anon}</label>
      {status === "error" && <p className="error" role="alert">{f.required}</p>}
      <button className="btn btn--primary" type="submit" disabled={status === "sending"}>
        {status === "sending" ? f.sending : <>{f.submit} <span className="arrow">→</span></>}
      </button>
      {status === "ok" && <p className="ok" role="status">{f.done}</p>}
      {status === "mail" && <p className="ok" role="status">{f.doneMail}</p>}
      {status === "failed" && <p className="error" role="alert">{f.failed} <a href="mailto:compliance@honesus.com">compliance@honesus.com</a></p>}
    </form>
  );
}

export default function Qssa() {
  const { t } = useT();
  const p = t.qssaPage;
  const [certsOpen, setCertsOpen] = useState(false);
  const [complianceDoc, setComplianceDoc] = useState(null); // índice do documento de compliance aberto
  const [policyDoc, setPolicyDoc] = useState(null); // índice da política QSSA aberta

  return (
    <>
      <PageHero bg="assets/limpeza.jpg" page="qssa" eyebrow={p.eyebrow} title={p.title} lead={p.lead}
        chips={p.chips.map((c, k) => [c, SECTION_IDS[k]])} />

      <section className="section" id="compromissos">
        <div className="container">
          <SectionHead eyebrow={p.commitments.eyebrow} title={p.commitments.title} />
          <div className="grid-4">
            {p.commitments.items.map(([h, d]) => <div key={h} className="card card--top reveal"><h3>{h}</h3><p>{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section section--soft" id="politicas">
        <div className="container">
          <div className="section-head reveal">
            <div><span className="eyebrow">{p.policies.eyebrow}</span><h2>{p.policies.title}</h2></div>
            <span className="assoc">{p.policies.note}</span>
          </div>
          <div className="table reveal">
            <div className="table-row head">
              <span>{p.policies.head[0]}</span><span className="meta">{p.policies.head[1]}</span><span>{p.policies.head[2]}</span>
            </div>
            {p.policies.items.map(([h, d], k) => {
              const isCerts = k === p.policies.items.length - 1;
              return (
                <div key={k} className="table-row">
                  <div><h4>{h}</h4><p>{d}</p></div>
                  <span className="meta">{isCerts ? p.policies.valid : ""}</span>
                  {isCerts
                    ? <button type="button" className="btn-pdf" onClick={() => setCertsOpen(true)}>{p.policies.view}</button>
                    : <button type="button" className="btn-pdf" onClick={() => setPolicyDoc(k)}>{p.policies.view}</button>}
                </div>
              );
            })}
          </div>
        </div>
        {/* Políticas QSSA: o aviso de documento em falta encaminha para a equipa de QSSA (geral@) */}
        <DocViewer open={policyDoc !== null} onClose={() => setPolicyDoc(null)} dir="assets/documentos"
          l={{ ...p.certs, missing: p.certs.missingQssa, missingEmail: "geral@honesus.com" }}
          docs={policyDoc === null ? [] : [{ file: POLICY_FILES[policyDoc], title: p.policies.items[policyDoc][0], issuer: "HONESUS" }]} />
        <DocViewer open={certsOpen} onClose={() => setCertsOpen(false)} l={p.certs}
          docs={CERTS.map(([file, valid], k) => ({ file, valid, title: p.certs.items[k][0], issuer: p.certs.items[k][1] }))} />
      </section>

      <section className="section section--dark" id="compliance">
        <div className="container two-col">
          <div className="reveal">
            <span className="eyebrow">{p.compliance.eyebrow}</span>
            <h2>{p.compliance.title}</h2>
            <p className="lead">{p.compliance.lead}</p>
            <ul className="checks">{p.compliance.checks.map(c => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="reveal">
            {p.compliance.docs.map(([h, d], k) => (
              <div key={k} className="policy" id={k === 2 ? "privacidade" : undefined}>
                <div><h4>{h}</h4><p>{d}</p></div>
                <button type="button" className="btn-pdf" onClick={() => setComplianceDoc(k)}>{p.policies.view}</button>
              </div>
            ))}
            <DocViewer open={complianceDoc !== null} onClose={() => setComplianceDoc(null)} l={p.certs} dir="assets/documentos"
              docs={complianceDoc === null ? [] : [{ file: COMPLIANCE_FILES[complianceDoc], title: p.compliance.docs[complianceDoc][0], issuer: "HONESUS" }]} />
          </div>
        </div>
      </section>

      <section className="section" id="denuncias">
        <div className="container two-col">
          <div className="reveal">
            <span className="eyebrow">{p.whistle.eyebrow}</span>
            <h2>{p.whistle.title}</h2>
            <p className="lead">{p.whistle.lead}</p>
            <ul className="checks">{p.whistle.checks.map(c => <li key={c}>{c}</li>)}</ul>
            <p>{p.whistle.alsoEmail} <a className="link-arrow" href="mailto:compliance@honesus.com">compliance@honesus.com</a></p>
          </div>
          <WhistleForm />
        </div>
      </section>

      <section className="section section--soft" id="fornecedor">
        <div className="container two-col" style={{ alignItems: "center" }}>
          <div className="reveal">
            <span className="eyebrow">{p.supplier.eyebrow}</span>
            <h2>{p.supplier.title}</h2>
            <p className="lead">{p.supplier.lead}</p>
            <a className="btn btn--dark" href="mailto:compliance@honesus.com?subject=Pacote%20de%20qualifica%C3%A7%C3%A3o">
              {p.supplier.btn} <span className="arrow">→</span>
            </a>
          </div>
          <div className="kv reveal">
            {p.supplier.rows.map(([k, v]) => <div key={k}><span>{k}</span><b>{v}</b></div>)}
          </div>
        </div>
      </section>
    </>
  );
}
