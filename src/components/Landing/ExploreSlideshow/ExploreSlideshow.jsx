import React, { useState, useCallback, useEffect } from "react";
import "./ExploreSlideshow.css";

// Recibe los assets como props o los define aquí si son fijos
const videoPool = ["video-demo-1.mp4", "video-demo-2.mp4"];
const imagePool = ["image-demo-1.jpg", "image-demo-2.jpg", "image-demo-3.jpg"];
const textPool = [
  "Un momento para detenerte",
  "El bienestar comienza aquí",
  // ...resto de textos
];

// ...resto de la lógica y JSX del slideshow...

export default function ExploreSlideshow(props) {
  // ...lógica y render...
  return <div className="explore-slideshow">{/* ...slideshow UI... */}</div>;
}
