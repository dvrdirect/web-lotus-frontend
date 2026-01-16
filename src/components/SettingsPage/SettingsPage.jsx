import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import "./SettingsPage.css";

function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [whatsappNotifications, setWhatsappNotifications] = useState(true);
  const [shareData, setShareData] = useState(false);

  return (
    <div className="account-page">
      <Navbar />
      <SocialFloatingBar />
      <main className="account-page__main">
        <header className="account-page__hero">
          <span className="account-page__eyebrow">Preferencias</span>
          <h1 className="account-page__title">Configuración</h1>
          <p className="account-page__subtitle">
            Ajusta tu experiencia: recordatorios, canales de contacto y
            preferencias de bienestar.
          </p>
        </header>

        <section
          className="account-page__card settings-card"
          aria-label="Configuración de cuenta"
        >
          <div className="settings-section">
            <h2 className="settings-section__title">
              Preferencias de notificación
            </h2>
            <p className="settings-section__description">
              Elige cómo deseas recibir recordatorios y confirmaciones de tus
              citas.
            </p>
            <div className="settings-section__row">
              <div className="settings-section__text">
                <span className="settings-section__label">Email</span>
                <span className="settings-section__hint">
                  Confirmaciones y recordatorios suaves en tu bandeja.
                </span>
              </div>
              <button
                type="button"
                className={
                  "settings-switch" +
                  (emailNotifications ? " settings-switch--on" : "")
                }
                onClick={() => setEmailNotifications((prev) => !prev)}
                aria-pressed={emailNotifications}
              >
                <span className="settings-switch__thumb" />
              </button>
            </div>

            <div className="settings-section__row">
              <div className="settings-section__text">
                <span className="settings-section__label">WhatsApp</span>
                <span className="settings-section__hint">
                  Mensajes discretos para confirmar o reagendar.
                </span>
              </div>
              <button
                type="button"
                className={
                  "settings-switch" +
                  (whatsappNotifications ? " settings-switch--on" : "")
                }
                onClick={() => setWhatsappNotifications((prev) => !prev)}
                aria-pressed={whatsappNotifications}
              >
                <span className="settings-switch__thumb" />
              </button>
            </div>
          </div>

          <div className="settings-section">
            <h2 className="settings-section__title">Cambio de contraseña</h2>
            <p className="settings-section__description">
              Por tu seguridad, pronto podrás actualizar tu contraseña desde
              este espacio.
            </p>
            <button
              type="button"
              className="account-page__button account-page__button--outline"
            >
              Gestionar contraseña
            </button>
          </div>

          <div className="settings-section">
            <h2 className="settings-section__title">Gestión de privacidad</h2>
            <p className="settings-section__description">
              Controla cómo utilizamos tus datos para mejorar tu experiencia.
            </p>
            <div className="settings-section__row">
              <div className="settings-section__text">
                <span className="settings-section__label">
                  Compartir datos para recomendaciones
                </span>
                <span className="settings-section__hint">
                  Usamos solo información esencial para sugerir tratamientos.
                </span>
              </div>
              <button
                type="button"
                className={
                  "settings-switch" + (shareData ? " settings-switch--on" : "")
                }
                onClick={() => setShareData((prev) => !prev)}
                aria-pressed={shareData}
              >
                <span className="settings-switch__thumb" />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Link
        to="/"
        className="account-page__fab"
        aria-label="Regresar a la página principal"
      >
        <ArrowLeft size={20} />
      </Link>
    </div>
  );
}

export default SettingsPage;
