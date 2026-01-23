import React, { useEffect, useState } from "react";
import "./SocialSidebar.css";

const testimonials = [
  { text: "Un oasis de paz, salí renovada.", author: "María G." },
  { text: "El mejor masaje de mi vida.", author: "Laura P." },
  { text: "Ambiente y atención inigualables.", author: "Sofía R." },
  { text: "El ritual de té es sublime.", author: "Ana L." },
  { text: "Volveré cada mes, ¡gracias!", author: "Carmen T." },
  { text: "Un lugar para consentirse de verdad.", author: "Valeria M." },
];
// Carga automática de imágenes y videos del slideshow con Vite
const mediaModules = import.meta.glob(
  "../../../images/slideshow/*.{jpg,jpeg,png,webp,mp4}",
  { eager: true },
);

const SLIDES = Object.keys(mediaModules)
  .sort()
  .map((path) => {
    const isVideo = path.toLowerCase().endsWith(".mp4");
    return {
      type: isVideo ? "video" : "image",
      src: mediaModules[path].default,
    };
  });

const SLIDE_DURATIONS = SLIDES.map((s) =>
  s && s.type === "video" ? 6000 : 3500,
);

const SocialSidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) =>
        prev === testimonials.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const [slide, setSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [slideshowPaused, setSlideshowPaused] = useState(false);
  const videoRefs = React.useRef([]);

  useEffect(() => {
    if (slideshowPaused || SLIDES.length === 0) return;
    setProgress(0);
    let start = Date.now();
    let raf;
    const tick = () => {
      const duration = SLIDE_DURATIONS[slide] || 3500;
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / duration, 1));
      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        setProgress(0);
        setSlide((s) => (s + 1) % SLIDES.length);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => raf && cancelAnimationFrame(raf);
  }, [slide, slideshowPaused]);

  useEffect(() => {
    const current = SLIDES[slide];
    if (!current || current.type !== "video") return;
    const video = videoRefs.current[slide];
    if (!video) return;
    const onEnded = () => {
      setSlide((s) => (s + 1) % SLIDES.length);
    };
    video.addEventListener("ended", onEnded);
    return () => video.removeEventListener("ended", onEnded);
  }, [slide]);

  const goTo = (idx) => {
    if (!SLIDES.length) return;
    setSlide((idx + SLIDES.length) % SLIDES.length);
    setProgress(0);
  };

  const prev = () => goTo(slide - 1);
  const next = () => goTo(slide + 1);

  return (
    <section className="social-sidebar">
      <div className="social-sidebar__grid">
        <div className="social-sidebar__card">
          <h2 className="social-sidebar__headline">
            Lo que dicen nuestras clientas
          </h2>
          <div className="social-sidebar__testimonials-viewport">
            <div
              className="social-sidebar__testimonials-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((item, index) => (
                <div className="social-sidebar__testimonial" key={index}>
                  <p className="social-sidebar__quote">“{item.text}”</p>
                  <span className="social-sidebar__author">{item.author}</span>
                </div>
              ))}
            </div>
            <div className="social-sidebar__testimonials-nav">
              <button
                className="social-sidebar__testimonials-nav-btn"
                aria-label="Anterior"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? testimonials.length - 1 : prev - 1,
                  )
                }
              >
                &#8592;
              </button>
              <button
                className="social-sidebar__testimonials-nav-btn"
                aria-label="Siguiente"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === testimonials.length - 1 ? 0 : prev + 1,
                  )
                }
              >
                &#8594;
              </button>
            </div>
          </div>
          <button
            className="social-sidebar__cta"
            onClick={() => (window.location.href = "#reservar")}
          >
            Reservar experiencia
          </button>
        </div>

        <div
          className="social-sidebar__slideshow"
          onMouseEnter={() => setSlideshowPaused(true)}
          onMouseLeave={() => setSlideshowPaused(false)}
        >
          <div className="social-sidebar__story-progress">
            {SLIDES.map((_, i) => (
              <div
                key={i}
                className={`social-sidebar__story-bar${
                  i === slide ? " social-sidebar__story-bar--active" : ""
                }`}
              >
                {i === slide && (
                  <div
                    className="social-sidebar__story-bar-fill"
                    style={{ width: `${progress * 100}%` }}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="social-sidebar__nav">
            <button
              className="social-sidebar__nav-button social-sidebar__nav-button--prev"
              onClick={prev}
              aria-label="Anterior"
            >
              <span>&#8592;</span>
            </button>
            <button
              className="social-sidebar__nav-button social-sidebar__nav-button--next"
              onClick={next}
              aria-label="Siguiente"
            >
              <span>&#8594;</span>
            </button>
          </div>
          <div className="social-sidebar__slide-wrapper">
            {SLIDES.map((slideObj, i) => (
              <div
                className={`social-sidebar__slide social-sidebar__slide--${
                  slideObj.type
                } ${i === slide ? "active" : ""}`}
                key={i}
                style={{
                  opacity: i === slide ? 1 : 0,
                  zIndex: i === slide ? 2 : 1,
                }}
              >
                {slideObj.type === "image" ? (
                  <img
                    src={slideObj.src}
                    alt="Experiencia real Lotus Spa"
                    className="social-sidebar__media"
                    draggable={false}
                  />
                ) : (
                  <video
                    ref={(el) => (videoRefs.current[i] = el)}
                    src={slideObj.src}
                    className="social-sidebar__media"
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialSidebar;
