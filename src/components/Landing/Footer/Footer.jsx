import React from "react";
import "./Footer.css";
import logo from "../../../images/logos/transparent_logo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        <button
          type="button"
          className="footer__branding"
          onClick={handleLogoClick}
          aria-label="Ir a la sección principal"
        >
          <img
            src={logo}
            alt="Lotus Spa & Tea"
            className="footer__logo"
            width={64}
            height={64}
          />
          <span className="footer__brand-phrase">
            Lotus Spa & Tea · Bienestar consciente
          </span>
        </button>

        <nav className="footer__nav" aria-label="Navegación principal">
          <a href="#productos" className="footer__nav-item">
            Productos
          </a>
          <a href="#promociones" className="footer__nav-item">
            Promociones
          </a>
          <a href="#contacto" className="footer__nav-item">
            Contacto
          </a>
          <a href="#contacto" className="footer__nav-item footer__cta">
            Reservar
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
