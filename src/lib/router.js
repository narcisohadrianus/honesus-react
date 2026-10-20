import { useEffect, useState } from "react";

// Rotas por hash — funcionam em qualquer alojamento estático, sem configurar o servidor.
// "#/servicos/cabotagem" -> { page: "servicos", section: "cabotagem" }
export function parseHash() {
  const [page, section] = (window.location.hash.replace(/^#\/?/, "") || "inicio").split("/");
  return { page: page || "inicio", section: section || null };
}

export const href = (page, section) => "#/" + page + (section ? "/" + section : "");

export function useRoute() {
  const [route, setRoute] = useState(parseHash);
  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}
