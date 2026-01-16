import React from "react";
import { Link } from "react-router-dom";
import "./ProductsSection.css";
import PatternSection from "../../Shared/PatternSection/PatternSection";

const CARDS = [
  {
    title: "Resets Energéticos",
    img: "/src/images/backgrounds/image_1.png",
    desc: "Liberar cargas, equilibrar tu energía y reconectar con tu esencia. Experiencias diseñadas para restaurar el balance cuerpo, mente y espíritu.",
  },
  {
    title: "Terapias de bienestar",
    img: "/src/images/backgrounds/image_2.png",
    desc: "Técnicas tradicionales y contemporáneas para relajar, sanar y nutrir desde adentro. Una invitación a detenerte y cuidarte profundamente.",
  },
  {
    title: "Verte bien es sentirte bien",
    img: "/src/images/backgrounds/image_3.png",
    desc: "Tratamientos de belleza consciente que combinan lujo, ciencia y naturaleza. Cuidamos tu piel y tu imagen desde un enfoque de bienestar integral.",
  },
];

const ProductsSection = () => (
  <PatternSection
    id="productos"
    variant="image"
    imageKey="image1"
    className="products-section"
  >
    <div className="products-section__header">
      <h2 className="products-section__headline">Nuestros Servicios</h2>
      <p className="products-section__copy">
        Todos nuestros productos y servicios se alinean con la misión de crear
        experiencias que equilibren cuerpo, mente y espíritu en un cuidado
        consciente.
      </p>
    </div>
    <div className="products-section__cards">
      {CARDS.map((card, i) => (
        <div className="products-section__card" key={i}>
          <div className="products-section__card-img-wrap">
            <img
              className="products-section__card-img"
              src={card.img}
              alt={card.title}
              loading="lazy"
            />
          </div>
          <h3 className="products-section__card-title">{card.title}</h3>
          <p className="products-section__card-desc">{card.desc}</p>
        </div>
      ))}
    </div>
    <div className="products-section__cta-wrap">
      <Link
        className="products-section__cta"
        to="/products"
        aria-label="Ver lista completa de servicios"
      >
        Ver lista completa de servicios
      </Link>
    </div>
  </PatternSection>
);

export default ProductsSection;
