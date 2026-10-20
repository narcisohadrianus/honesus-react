# HONESUS — site institucional

Site da HONESUS Comércio e Serviços, Lda. em **React 18 + Vite**, com as páginas Início, Serviços, Produtos, QSSA & Compliance e Contactos, em **Português, English e 中文**.

## Requisitos

- [Node.js](https://nodejs.org) 18 ou superior (inclui o `npm`)

## Comandos

```bash
npm install      # instala as dependências (uma vez)
npm run dev      # servidor de desenvolvimento em http://localhost:5173
npm run build    # gera a versão final optimizada na pasta dist/
npm run preview  # pré-visualiza a pasta dist/
```

Para publicar, envie o **conteúdo da pasta `dist/`** para o alojamento. As rotas usam `#/` (ex.: `#/contactos`), por isso não é preciso configurar o servidor.

## Estrutura

```
public/assets/        imagens, vídeos e símbolo do logotipo
src/
  main.jsx            ponto de entrada
  App.jsx             idioma, rotas e layout
  styles.css          estilos (cores do logotipo: #1F4F99 e #2A3C60)
  i18n/               pt.js · en.js · zh.js — todos os textos do site
  lib/                router.js (rotas #/) · useReveal.js (animações)
  components/         Header, HeroCarousel, Layout (rodapé, títulos…), Brand, Icons
  pages/              Inicio, Servicos, Produtos, Qssa, Contactos
```

## Editar textos

Todos os textos estão em `src/i18n/`. Os três ficheiros têm exactamente a mesma estrutura: ao alterar um texto em `pt.js`, altere também em `en.js` e `zh.js`.

## Formulário de contacto

Sem servidor, o botão "Enviar" abre o e-mail do visitante com a mensagem preenchida para `geral@honesus.com`. Para envio directo, ligue um serviço como Formspree ou EmailJS na função `submit` de `src/pages/Contactos.jsx`.
