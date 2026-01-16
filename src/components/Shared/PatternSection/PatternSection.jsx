import React from "react";
import "./PatternSection.css";

import bgCabina from "../../../images/backgrounds/cabina.jpg";
import bg1 from "../../../images/backgrounds/image_1.png";
import bg2 from "../../../images/backgrounds/image_2.png";
import bg3 from "../../../images/backgrounds/image_3.png";
import bg4 from "../../../images/backgrounds/image_4.png";

const IMAGE_MAP = {
  cabina: bgCabina,
  image1: bg1,
  image2: bg2,
  image3: bg3,
  image4: bg4,
};

/**
 * Patrón de secciones alternadas:
 * - variant="image"  → fondo con imagen + overlay semitransparente.
 * - variant="white"  → fondo blanco limpio.
 *
 * Uso recomendado en páginas largas:
 * <PatternSection variant="image" imageKey="cabina">...</PatternSection>
 * <PatternSection variant="white">...</PatternSection>
 */
const PatternSection = ({
  variant = "image",
  imageKey = "cabina",
  className = "",
  children,
  id,
}) => {
  const baseClass = "pattern-section";
  const variantClass =
    variant === "white" ? "pattern-section--white" : "pattern-section--image";

  const backgroundImage =
    variant === "image" ? IMAGE_MAP[imageKey] || IMAGE_MAP.cabina : null;

  const style =
    variant === "image" && backgroundImage
      ? { backgroundImage: `url(${backgroundImage})` }
      : undefined;

  return (
    <section
      id={id}
      className={`${baseClass} ${variantClass} ${className}`.trim()}
      style={style}
    >
      {variant === "image" && <div className="pattern-section__overlay" />}
      <div className="pattern-section__inner">{children}</div>
    </section>
  );
};

export default PatternSection;
