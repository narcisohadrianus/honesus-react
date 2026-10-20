// Aplicação: idioma, rotas e montagem
(function () {
  const { useState, useEffect } = React;
  const { html, LangCtx, parseHash, useReveal, Header, Footer, CtaBand, ToTop, pages } = window.H;
  const I18N = window.HONESUS_I18N;

  function initialLang() {
    const q = new URLSearchParams(location.search).get("lang");
    if (q && I18N[q]) return q;
    try { const s = localStorage.getItem("honesus-lang"); if (s && I18N[s]) return s; } catch (e) {}
    const nav = (navigator.language || "pt").slice(0, 2);
    return I18N[nav] ? nav : "pt";
  }

  function App() {
    const [lang, setLangState] = useState(initialLang);
    const [route, setRoute] = useState(parseHash);
    const t = I18N[lang];

    const setLang = l => { setLangState(l); try { localStorage.setItem("honesus-lang", l); } catch (e) {} };

    useEffect(() => {
      const on = () => setRoute(parseHash());
      addEventListener("hashchange", on);
      return () => removeEventListener("hashchange", on);
    }, []);

    useEffect(() => {
      document.documentElement.lang = lang === "zh" ? "zh" : lang;
      document.title = t.meta.title;
    }, [lang]);

    // Ao mudar de rota: ir para a secção pedida ou para o topo
    useEffect(() => {
      const id = route.section;
      requestAnimationFrame(() => {
        const el = id && document.getElementById(id);
        if (el) scrollTo({ top: el.getBoundingClientRect().top + scrollY - 90, behavior: "smooth" });
        else scrollTo(0, 0);
      });
    }, [route.page, route.section]);

    useReveal([route.page, lang]);

    const Page = pages[route.page] || pages.inicio;
    return html`<${LangCtx.Provider} value=${{ lang, t, setLang }}>
      <${Header} route=${route}/>
      <main key=${route.page} class="page-enter"><${Page}/></main>
      ${route.page !== "contactos" && html`<${CtaBand}/>`}
      <${Footer}/>
      <${ToTop}/>
    </${LangCtx.Provider}>`;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(html`<${App}/>`);
})();
