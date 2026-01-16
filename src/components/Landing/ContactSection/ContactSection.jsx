import React from "react";
import "./ContactSection.css";

const ContactSection = () => (
  <section className="contact-section" id="contacto">
    <div className="contact-section__container">
      <h2 className="contact-section__title">Contáctanos</h2>
      <p className="contact-section__subtitle">
        Tu bienestar comienza con un mensaje
      </p>
      <div className="contact-section__methods">
        <a
          href="https://wa.me/5215571089120"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-section__item contact-section__whatsapp"
        >
          <span className="contact-section__whatsapp-icon" aria-hidden="true">
            {/* Ícono WhatsApp SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="12" fill="#b97c8b" />
              <path
                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.767.967-.94 1.164-.173.198-.347.223-.644.075-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.099 3.205 5.077 4.367.71.244 1.263.389 1.695.497.712.181 1.36.156 1.872.095.571-.067 1.758-.719 2.007-1.413.248-.694.248-1.288.173-1.413-.074-.124-.272-.198-.57-.347z"
                fill="#fff"
              />
            </svg>
          </span>
          <span className="contact-section__whatsapp-label">WhatsApp</span>
          <span className="contact-section__whatsapp-number">
            +52 1 55 7108 9120
          </span>
        </a>
        <a
          href="tel:5575411174"
          className="contact-section__item contact-section__phone"
        >
          <span className="contact-section__phone-icon" aria-hidden="true">
            {/* Ícono Teléfono SVG */}
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="11" r="11" fill="#f3e6e1" />
              <path
                d="M16.5 14.5c-.5 0-2.5-1-3-1s-1 .5-1.5 1c-1.5-.5-3-2-3.5-3.5.5-.5 1-1 1-1.5s-1-2.5-1-3c0-.5-1-1-1.5-1S4 6.5 4 7.5c0 4.5 4 8.5 8.5 8.5 1 0 1.5-1 1.5-1.5s-.5-1.5-1-1.5z"
                fill="#b97c8b"
              />
            </svg>
          </span>
          <span className="contact-section__phone-label">Teléfono</span>
          <span className="contact-section__phone-number">55 7541 1174</span>
        </a>
      </div>
      <div className="contact-section__socials">
        <a
          href="https://www.facebook.com/LotusSpa.Tea"
          className="contact-section__social-link contact-section__social-link--fb"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook Lotus Spa & Tea"
        >
          {/* Ícono Facebook SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="11" fill="#f3e6e1" />
            <path
              d="M12.5 11.5h1.5l.25-2H12.5V8.5c0-.29.21-.5.5-.5h1V6.5h-1.5C11.12 6.5 10.5 7.12 10.5 8v1.5H9v2h1.5V16h2v-4.5z"
              fill="#b97c8b"
            />
          </svg>
        </a>
        <a
          href="https://www.instagram.com/lotus_spa_and_tea"
          className="contact-section__social-link contact-section__social-link--ig"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram Lotus Spa & Tea"
        >
          {/* Ícono Instagram SVG */}
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="11" r="11" fill="#f3e6e1" />
            <rect x="7" y="7" width="8" height="8" rx="3" fill="#b97c8b" />
            <circle cx="11" cy="11" r="2" fill="#fff" />
            <circle cx="14" cy="8" r="0.7" fill="#fff" />
          </svg>
        </a>
      </div>
    </div>
  </section>
);

export default ContactSection;
