// Envio dos formulários.
// Contacto: envia directamente para geral@honesus.com através do FormSubmit (formsubmit.co).
//   No primeiro envio, o FormSubmit manda um e-mail de activação para geral@honesus.com,
//   que tem de ser confirmado; só a partir daí as mensagens passam a chegar.
// Os endereços podem ser substituídos no .env (VITE_FORM_CONTACT / VITE_FORM_WHISTLE).
// Sem endereço, devolve false e o formulário abre o e-mail do visitante.
const ENDPOINTS = {
  contact: import.meta.env.VITE_FORM_CONTACT || "https://formsubmit.co/ajax/geral@honesus.com",
  whistle: import.meta.env.VITE_FORM_WHISTLE,
};

export const hasEndpoint = kind => Boolean(ENDPOINTS[kind]);

export async function sendForm(kind, data) {
  const url = ENDPOINTS[kind];
  if (!url) return false;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Envio falhou (${res.status})`);
  // O FormSubmit responde 200 mesmo quando recusa (ex.: formulário ainda por activar): ver "success"
  const reply = await res.json().catch(() => ({}));
  if (reply.success === false || reply.success === "false") throw new Error(reply.message || "Envio recusado");
  return true;
}

export function openMail(to, subject, body) {
  window.location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
