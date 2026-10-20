import { useEffect, useState } from "react";
import { I18N, LangContext, initialLang, saveLang } from "./i18n/index.js";
import { useRoute } from "./lib/router.js";
import { useReveal } from "./lib/useReveal.js";
import Header from "./components/Header.jsx";
import { CtaBand, Footer, ToTop } from "./components/Layout.jsx";
import Inicio from "./pages/Inicio.jsx";
import Servicos from "./pages/Servicos.jsx";
import Produtos from "./pages/Produtos.jsx";
import Qssa from "./pages/Qssa.jsx";
import Contactos from "./pages/Contactos.jsx";

const PAGES = { inicio: Inicio, servicos: Servicos, produtos: Produtos, qssa: Qssa, contactos: Contactos };

export default function App() {
  const [lang, setLangState] = useState(initialLang);
  const route = useRoute();
  const t = I18N[lang];

  const setLang = l => { setLangState(l); saveLang(l); };

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.meta.title;
  }, [lang, t]);

  // Ao mudar de rota: ir para a secção pedida (ex.: #/servicos/cabotagem) ou para o topo
  useEffect(() => {
    requestAnimationFrame(() => {
      const el = route.section && document.getElementById(route.section);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: "smooth" });
      else window.scrollTo(0, 0);
    });
  }, [route.page, route.section]);

  useReveal([route.page, lang]);

  const Page = PAGES[route.page] || Inicio;

  return (
    <LangContext.Provider value={{ lang, t, setLang }}>
      <Header route={route} />
      <main key={route.page} className="page-enter"><Page /></main>
      {route.page !== "contactos" && <CtaBand />}
      <Footer />
      <ToTop />
    </LangContext.Provider>
  );
}
