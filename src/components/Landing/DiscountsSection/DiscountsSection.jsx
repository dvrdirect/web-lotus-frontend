import React, { useState, useEffect } from "react";
import "./DiscountSection.css";
import PatternSection from "../../Shared/PatternSection/PatternSection";
import adMoldea from "../../../images/ads/ad_moldea_tu_cuerpo.jpg";
import adVerrugas from "../../../images/ads/ad_eliminacion_verrugas.jpg";
import adLimpieza from "../../../images/ads/ad_limpieza_facial.jpg";

const DISCOUNTS = [
  {
    title: "Moldea tu cuerpo",
    desc: "Super promo 50% a solo $399",
    img: adMoldea,
  },
  {
    title: "Eliminación de verrugas",
    desc: "Consulta por precio especial",
    img: adVerrugas,
  },
  {
    title: "Limpieza facial completa",
    desc: "50% a solo $399",
    img: adLimpieza,
  },
];

function DiscountModal({ open, onClose, discount }) {
  if (!open || !discount) return null;
  return (
    <div className="discount-modal" onClick={onClose}>
      <div
        className="discount-modal__content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={discount.img}
          alt={discount.title}
          className="discount-modal__img"
        />
        <h3 className="discount-modal__title">{discount.title}</h3>
        <p className="discount-modal__desc">{discount.desc}</p>
        <button className="discount-modal__cta" onClick={onClose}>
          Utilizar promoción
        </button>
      </div>
    </div>
  );
}

const DiscountsSection = () => {
  const [active, setActive] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDiscount, setModalDiscount] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % DISCOUNTS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const openModal = (idx) => {
    setModalDiscount(DISCOUNTS[idx]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalDiscount(null);
  };

  return (
    <PatternSection
      id="promociones"
      variant="white"
      className="discounts-section"
    >
      <h2 className="discounts-section__headline">Descuentos y Promociones</h2>
      <div className="discounts-section__slideshow">
        {DISCOUNTS.map((item, idx) => (
          <div
            key={idx}
            className={`discounts-section__slide${
              active === idx ? " discounts-section__slide--active" : ""
            }`}
            onClick={() => openModal(idx)}
            style={{
              display: active === idx ? "flex" : "none",
              backgroundImage: `url(${item.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "relative",
            }}
          />
        ))}
      </div>
      {/* Título y descripción fuera de la card para máxima legibilidad */}
      <div className="discounts-section__details">
        <h3 className="discounts-section__title">{DISCOUNTS[active].title}</h3>
        <p className="discounts-section__desc">{DISCOUNTS[active].desc}</p>
      </div>
      <DiscountModal
        open={modalOpen}
        onClose={closeModal}
        discount={modalDiscount}
      />
    </PatternSection>
  );
};

export default DiscountsSection;
