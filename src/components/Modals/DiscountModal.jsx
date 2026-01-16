import React, { useEffect, useState } from "react";
import "./DiscountModal.css";
import { useAuth } from "../../context/AuthContext";

// Versión del flag de visibilidad del anuncio.
// Cambiar el sufijo (v2, v3, ...) resetea el estado para todas las usuarias.
const STORAGE_KEY = "lotus_spa_discount_ad_hidden_v2";

const DiscountModal = () => {
  const { isLoggedIn } = useAuth();
  const [visible, setVisible] = useState(false);

  // Marca en localStorage que el anuncio ya no debe mostrarse
  const persistHidden = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "true");
    } catch (e) {
      // Silenciar errores de almacenamiento
    }
  };

  const handleClose = () => {
    setVisible(false);
    persistHidden();
  };

  const handleClaim = () => {
    persistHidden();
    setVisible(false);

    // Dispara un evento global para que el Navbar abra el SignupModal
    try {
      const event = new CustomEvent("lotus:open-signup");
      window.dispatchEvent(event);
    } catch (e) {
      // Si falla por alguna razón, simplemente no hacemos nada extra
    }
  };

  useEffect(() => {
    // Si ya está logueado, nunca mostramos el modal
    if (isLoggedIn) {
      return;
    }

    // Si ya se ocultó antes (cerró o se registró), no volver a mostrar
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "true") return;
    } catch (e) {
      // Ignorar errores de lectura
    }

    const timer = window.setTimeout(() => {
      setVisible(true);
    }, 10000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isLoggedIn]);

  if (!visible) return null;

  return (
    <div className="discount-ad" role="dialog" aria-modal="true">
      <div className="discount-ad__backdrop" onClick={handleClose} />
      <div className="discount-ad__card" role="document">
        <button
          type="button"
          className="discount-ad__close"
          aria-label="Cerrar anuncio de descuento"
          onClick={handleClose}
        >
          ×
        </button>
        <h2 className="discount-ad__title">Un regalo para tu bienestar</h2>
        <p className="discount-ad__body">
          Obtén un 10% de descuento en tu primer ritual de spa al crear tu
          cuenta hoy.
        </p>
        <button
          type="button"
          className="discount-ad__button"
          onClick={handleClaim}
        >
          Reclamar mi regalo
        </button>
      </div>
    </div>
  );
};

export default DiscountModal;
