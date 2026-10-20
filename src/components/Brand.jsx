import { href } from "../lib/router.js";

// Logotipo HONESUS (símbolo + nome) com fundo transparente; versão clara para o rodapé escuro
export function Brand({ light = false }) {
  return (
    <a className="brand" href={href("inicio")}>
      <img className="brand-logo-img" src={light ? "assets/logo-honesus-branco.png" : "assets/logo-honesus.png"}
        alt="HONESUS" width="496" height="180" />
    </a>
  );
}
