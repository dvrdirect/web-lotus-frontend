import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import "./HistorialClinicoPage.css";

function HistorialClinicoPage() {
  return (
    <div className="account-page">
      <Navbar />
      <SocialFloatingBar />

      <main className="account-page__main">
        <header className="account-page__hero">
          <span className="account-page__eyebrow">Salud & Bienestar</span>
          <h1 className="account-page__title">Historial Clínico</h1>
          <p className="account-page__subtitle">
            Un espacio privado para centralizar tu información y seguimiento.
          </p>
        </header>

        <section
          className="account-page__card clinical-history"
          aria-label="Historial clínico"
        >
          <div className="account-page__card-header">
            <h2 className="account-page__card-title">Tu información, protegida</h2>
            <p className="account-page__card-caption">
              Solo tú podrás ver este apartado cuando inicies sesión.
            </p>
          </div>

          <div className="clinical-history__placeholder">
            <div className="clinical-history__icon" aria-hidden="true">
              <FileText size={18} />
            </div>
            <div className="clinical-history__content">
              <p className="clinical-history__title">Próximamente</p>
              <p className="clinical-history__text">
                Aquí mostraremos tu historial clínico (notas, recomendaciones y
                seguimiento de tratamientos) de forma segura.
              </p>
              <p className="clinical-history__privacy">
                <ShieldCheck size={14} />
                Acceso exclusivo para usuarios autenticados.
              </p>
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

export default HistorialClinicoPage;
