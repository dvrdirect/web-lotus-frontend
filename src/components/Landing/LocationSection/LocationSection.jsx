import React from "react";
import "./LocationSection.css";

const LocationSection = () => (
  <section className="location-section" id="ubicacion">
    <div className="location-section__container">
      <div className="location-section__col location-section__col--image">
        <img
          src="/src/images/backgrounds/cabina.jpg"
          alt="Spa Lotus - Cabina"
          className="location-section__image"
        />
      </div>
      <div className="location-section__col location-section__col--info">
        <h2 className="location-section__title">Dónde encontrarnos</h2>
        <p className="location-section__desc">
          Un espacio diseñado para tu bienestar, ubicado en una zona tranquila y
          de fácil acceso.
        </p>
        <div className="location-section__address-group">
          <div className="location-section__address">
            <span className="location-section__address-label">Dirección:</span>
            <span className="location-section__address-value">
              59 C. Nicolás Bravo Sur, 55030 Estado de México, México
            </span>
          </div>
        </div>
        <div className="location-section__map-wrap">
          <iframe
            className="location-section__map"
            src="https://www.google.com/maps?q=59+C.+Nicol%C3%A1s+Bravo+Sur,+55030+Estado+de+M%C3%A9xico,+Mexico&output=embed"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Lotus Spa & Tea"
          ></iframe>
        </div>
      </div>
    </div>
  </section>
);

export default LocationSection;
