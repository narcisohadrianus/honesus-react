import { createContext, useContext } from "react";
import pt from "./pt.js";
import en from "./en.js";
import zh from "./zh.js";

export const I18N = { pt, en, zh };
export const LANGS = [["pt", "PT"], ["en", "EN"], ["zh", "中文"]];

export const LangContext = createContext({ lang: "pt", t: pt, setLang: () => {} });
export const useT = () => useContext(LangContext);

// Idioma inicial: ?lang=xx → escolha guardada → idioma do navegador → português
export function initialLang() {
  const q = new URLSearchParams(window.location.search).get("lang");
  if (q && I18N[q]) return q;
  try {
    const saved = localStorage.getItem("honesus-lang");
    if (saved && I18N[saved]) return saved;
  } catch (e) { /* armazenamento indisponível */ }
  const nav = (navigator.language || "pt").slice(0, 2);
  return I18N[nav] ? nav : "pt";
}

export function saveLang(lang) {
  try { localStorage.setItem("honesus-lang", lang); } catch (e) { /* ignorar */ }
}
