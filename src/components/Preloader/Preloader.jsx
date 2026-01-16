import React from "react";
import Lottie from "lottie-react";
import "./Preloader.css";
import loadingSpa from "../../lotties/loading_dots.json";

function Preloader() {
  return (
    <div className="preloader preloader_visible">
      <div className="preloader__content">
        <Lottie
          animationData={loadingSpa}
          loop={true}
          className="preloader__lottie"
        />
        <p className="preloader__text">Preparando tu experiencia...</p>
      </div>
    </div>
  );
}

export default Preloader;
