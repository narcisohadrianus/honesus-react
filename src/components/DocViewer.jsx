import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// Janela com a lista de documentos; ao escolher um, mostra o PDF dentro do próprio site.
// Com um só documento, abre-o directamente (sem lista nem "Voltar").
// docs: [{ file, title, issuer, valid, dir }] — ficheiros em public/<dir>/<file>.pdf (+ .jpg de miniatura);
// file: null = documento ainda não publicado (mostra aviso com o contacto).
export default function DocViewer({ open, onClose, docs, l, dir = "assets/certificados" }) {
  const [current, setCurrent] = useState(null);
  const closeRef = useRef(null);
  const single = docs.length === 1;

  useEffect(() => {
    if (!open) return;
    setCurrent(single ? 0 : null);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = e => { if (e.key === "Escape") current !== null && !single ? setCurrent(null) : onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, current, onClose, single]);

  if (!open) return null;
  const idx = single ? 0 : current;
  const doc = idx !== null ? docs[idx] : null;
  const pdf = doc?.file && `${dir}/${doc.file}.pdf`;
  const meta = doc && [doc.issuer, doc.valid && `${l.validUntil} ${doc.valid}`].filter(Boolean).join(" · ");

  // Portal para o <body>: a página tem animação com transform, que prenderia o position: fixed
  return createPortal(
    <div className="doc-modal" role="dialog" aria-modal="true" aria-labelledby="doc-modal-title" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={"doc-panel" + (doc ? (pdf ? " doc-panel--view" : " doc-panel--missing") : "")}>
        <header className="doc-head">
          {doc && !single && <button type="button" className="doc-back" onClick={() => setCurrent(null)}>← {l.back}</button>}
          <h3 id="doc-modal-title">{doc ? doc.title : l.title}</h3>
          <button type="button" className="doc-close" ref={closeRef} onClick={onClose} aria-label={l.close}>×</button>
        </header>

        {!doc && (
          <>
            <p className="doc-lead">{l.lead}</p>
            <ul className="doc-list">
              {docs.map((d, k) => (
                <li key={d.file}>
                  <button type="button" className="doc-item" onClick={() => setCurrent(k)}>
                    <img src={`${dir}/${d.file}.jpg`} alt="" loading="lazy" />
                    <span className="doc-info">
                      <strong>{d.title}</strong>
                      <small>{d.issuer}</small>
                      <small>{l.validUntil} {d.valid}</small>
                    </span>
                    <span className="doc-open">{l.open} →</span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {doc && !pdf && (
          <div className="doc-missing">
            <p>{l.missing}</p>
            <a className="btn btn--primary" href={`mailto:${l.missingEmail}?subject=${encodeURIComponent(doc.title)}`}>{l.missingEmail}</a>
          </div>
        )}

        {doc && pdf && (
          <>
            {/* Se o navegador não mostrar PDFs embutidos (comum no telemóvel), aparece a miniatura com o botão para abrir */}
            <object className="doc-frame" data={pdf} type="application/pdf" aria-label={doc.title}>
              <div className="doc-fallback">
                <img src={`${dir}/${doc.file}.jpg`} alt={doc.title} />
                <a className="btn btn--primary" href={pdf} target="_blank" rel="noopener noreferrer">{l.newTab} →</a>
              </div>
            </object>
            <footer className="doc-foot">
              <span>{meta}</span>
              <span className="doc-actions">
                <a href={pdf} target="_blank" rel="noopener noreferrer">{l.newTab}</a>
                <a href={pdf} download>{l.download}</a>
              </span>
            </footer>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
