import React, { useEffect, useRef } from "react";
import "./HeroSection.css";
import transparentLogo from "../../../images/logos/transparent_logo.png";

const HeroSection = ({
  onExplore,
  isLogoHovered,
  setIsLogoHovered,
  dropLottie,
  Lottie,
}) => {
  const hasJumpedRef = useRef(false);

  const scrollToNavbar = () => {
    const navbar = document.querySelector(".navbar");
    if (!navbar) return;

    const rect = navbar.getBoundingClientRect();
    const offset = window.scrollY + rect.top;

    window.scrollTo({ top: offset, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScrollOrKey = (e) => {
      if (hasJumpedRef.current) return;
      const isKeyDownEvent = (() => {
        if (e.type !== "keydown") return false;
        const key = e.key || e.code;
        const keyCode = e.keyCode;
        return (
          key === "ArrowDown" ||
          key === "Down" ||
          key === "PageDown" ||
          key === " " ||
          key === "Spacebar" ||
          key === "Enter" ||
          keyCode === 40 ||
          keyCode === 34 ||
          keyCode === 13
        );
      })();
      const isWheelDownEvent = e.type === "wheel" && e.deltaY > 0;

      if (isKeyDownEvent || isWheelDownEvent) {
        if (e.type === "keydown") {
          e.preventDefault();
        }
        hasJumpedRef.current = true;
        scrollToNavbar();
      }
    };

    window.addEventListener("keydown", handleScrollOrKey);
    window.addEventListener("wheel", handleScrollOrKey, { passive: true });

    return () => {
      window.removeEventListener("keydown", handleScrollOrKey);
      window.removeEventListener("wheel", handleScrollOrKey);
    };
  }, []);

  return (
    <section className="hero-section" id="hero">
      <div className="hero-section__content">
        <div
          className="hero-section__logo-container"
          onMouseEnter={() => setIsLogoHovered && setIsLogoHovered(true)}
          onMouseLeave={() => setIsLogoHovered && setIsLogoHovered(false)}
        >
          <img
            src={transparentLogo}
            alt="Lotus Spa & Tea Logo"
            className="hero-section__logo-image"
            width="320"
            height="320"
          />
          {isLogoHovered && Lottie && dropLottie && (
            <div className="hero-section__lottie">
              <Lottie
                animationData={dropLottie}
                loop={true}
                autoplay={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          )}
        </div>
        <div className="hero-section__text-block">
          <h1 className="hero-section__title">
            Estudio de relajación y cuidado personal
          </h1>
          <p className="hero-section__subtitle">
            Rituales de spa y té diseñados para el descanso profundo
          </p>
        </div>
        <button
          onClick={scrollToNavbar}
          className="hero-section__cta-button"
          aria-label="Explorar experiencias de Lotus Spa"
        >
          Explorar
        </button>
      </div>
      <div
        className="hero-section__scroll-indicator"
        onClick={scrollToNavbar}
        role="button"
        aria-label="Desplazar hasta la barra de navegación"
      >
        <span className="hero-section__scroll-text">Desplazar</span>
        <svg
          className="hero-section__scroll-icon"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
