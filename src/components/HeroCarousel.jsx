import { useEffect, useRef, useState } from "react";
import { useT } from "../i18n/index.js";
import { href } from "../lib/router.js";
import { Icon } from "./Icons.jsx";

const DURATION = 8000;
const SLIDES = [
  { video: "assets/video-cabotagem.mp4", poster: "assets/poster-cabotagem.jpg", cta1: href("servicos", "cabotagem"), cta2: href("contactos") },
  { video: "assets/video-oilgas.mp4", poster: "assets/poster-oilgas.jpg", cta1: href("servicos"), cta2: href("produtos") },
];

// Carrossel com vídeos curtos: 1) Cabotagem  2) Oil & Gas
export default function HeroCarousel() {
  const { t } = useT();
  const [index, setIndex] = useState(0);
  const videos = useRef([]);

  useEffect(() => {
    videos.current.forEach((v, k) => {
      if (!v) return;
      if (k === index) { v.currentTime = 0; v.play().catch(() => {}); } else v.pause();
    });
    const id = setTimeout(() => setIndex((index + 1) % SLIDES.length), DURATION);
    return () => clearTimeout(id);
  }, [index]);

  const go = n => setIndex((n + SLIDES.length) % SLIDES.length);

  return (
    <section className="hero" aria-roledescription="carousel">
      {SLIDES.map((s, k) => {
        const c = t.hero[k];
        return (
          <div key={k} className={"slide" + (k === index ? " active" : "")} aria-hidden={k !== index}>
            <img src={s.poster} alt="" />
            <video ref={el => (videos.current[k] = el)} src={s.video} poster={s.poster} muted playsInline loop preload="auto" />
            <div className="slide-content container">
              <span className="eyebrow">{c.eyebrow}</span>
              <h1>{c.title}</h1>
              <p>{c.text}</p>
              <div className="hero-actions">
                <a className="btn btn--primary" href={s.cta1}>{c.cta1} <span className="arrow">→</span></a>
                <a className="btn btn--outline" href={s.cta2}>{c.cta2}</a>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-controls">
        <div className="container">
          <div className="hero-tabs">
            {SLIDES.map((_, k) => (
              // key muda a cada slide para reiniciar a barra de progresso
              <button key={k + "-" + index} className={"hero-tab" + (k === index ? " active" : "")} style={{ "--dur": DURATION + "ms" }} onClick={() => go(k)}>
                <span className="bar"><i /></span>
                <small>0{k + 1}</small>
                <strong>{t.hero[k].tab}</strong>
              </button>
            ))}
          </div>
          <div className="hero-arrows">
            <button className="hero-arrow" aria-label={t.common.prev} onClick={() => go(index - 1)}><Icon.left /></button>
            <button className="hero-arrow" aria-label={t.common.next} onClick={() => go(index + 1)}><Icon.right /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
