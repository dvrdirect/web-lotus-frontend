import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import { useAuth } from "../../context/AuthContext";
import "./ProfilePage.css";

function ProfilePage() {
  const { userData } = useAuth();
  const displayName = userData?.name || "Invitada";
  const email = userData?.email || "correo@ejemplo.com";
  const phone = userData?.phone || "+52 55 0000 0000";
  const birthdate = userData?.birthdate || "DD / MM / AAAA";

  return (
    <div className="account-page">
      <Navbar />
      <SocialFloatingBar />
      <main className="account-page__main">
        <header className="account-page__hero">
          <span className="account-page__eyebrow">Área personal</span>
          <h1 className="account-page__title">Hola, {displayName}</h1>
          <p className="account-page__subtitle">
            Este es tu espacio personal en Lotus Spa. Mantén tus datos al día
            para que cada experiencia se sienta diseñada especialmente para ti.
          </p>
        </header>

        <section
          className="account-page__card"
          aria-label="Información de perfil"
        >
          <div className="account-page__card-header">
            <h2 className="account-page__card-title">Datos de contacto</h2>
            <p className="account-page__card-caption">
              Revísalos con calma. Muy pronto podrás editarlos directamente
              desde aquí.
            </p>
          </div>

          <dl className="account-page__fields-grid">
            <div className="account-page__field">
              <dt className="account-page__field-label">Nombre completo</dt>
              <dd className="account-page__field-value">{displayName}</dd>
            </div>
            <div className="account-page__field">
              <dt className="account-page__field-label">Email</dt>
              <dd className="account-page__field-value">{email}</dd>
            </div>
            <div className="account-page__field">
              <dt className="account-page__field-label">Teléfono</dt>
              <dd className="account-page__field-value">{phone}</dd>
            </div>
            <div className="account-page__field">
              <dt className="account-page__field-label">Fecha de nacimiento</dt>
              <dd className="account-page__field-value">{birthdate}</dd>
            </div>
          </dl>

          <button
            type="button"
            className="account-page__button account-page__button--outline"
          >
            Editar Información
          </button>
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

export default ProfilePage;
