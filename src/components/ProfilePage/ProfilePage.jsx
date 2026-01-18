import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/userApi";
import "./ProfilePage.css";

function ProfilePage() {
  const { userData } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const displayName = userData?.name || "Invitada";
  const email = userData?.email || "correo@ejemplo.com";
  const phone = userData?.phone || "";
  const birthdate = userData?.birthdate || "";

  const [form, setForm] = useState({
    name: displayName,
    phone,
    birthdate,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError("");
      const updated = await updateProfile(form);
      // Refrescar estado local
      if (updated && updated.name) {
        // Actualiza AuthContext/localStorage con los nuevos datos
        if (typeof window !== "undefined") {
          try {
            const stored = window.localStorage.getItem("lotus_auth");
            const parsed = stored ? JSON.parse(stored) : null;
            const token = parsed?.token || null;
            window.localStorage.setItem(
              "lotus_auth",
              JSON.stringify({ user: updated, token }),
            );
          } catch (e) {
            console.error("No se pudo actualizar la sesión", e);
          }
        }
      }
      setIsEditing(false);
    } catch (e) {
      console.error("Error actualizando perfil", e);
      setError("No se pudo guardar los cambios. Intenta de nuevo.");
    } finally {
      setSaving(false);
    }
  };

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
              <dd className="account-page__field-value">
                {isEditing ? (
                  <input
                    className="account-page__input"
                    value={form.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                ) : (
                  displayName
                )}
              </dd>
            </div>
            <div className="account-page__field">
              <dt className="account-page__field-label">Email</dt>
              <dd className="account-page__field-value">{email}</dd>
            </div>
            <div className="account-page__field">
              <dt className="account-page__field-label">Teléfono</dt>
              <dd className="account-page__field-value">
                {isEditing ? (
                  <input
                    className="account-page__input"
                    value={form.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                  />
                ) : (
                  phone || "No especificado"
                )}
              </dd>
            </div>
            <div className="account-page__field">
              <dt className="account-page__field-label">Fecha de nacimiento</dt>
              <dd className="account-page__field-value">
                {isEditing ? (
                  <input
                    className="account-page__input"
                    placeholder="DD / MM / AAAA"
                    value={form.birthdate}
                    onChange={(e) => handleChange("birthdate", e.target.value)}
                  />
                ) : (
                  birthdate || "No especificada"
                )}
              </dd>
            </div>
          </dl>
          {error && <p className="account-page__error">{error}</p>}

          {isEditing ? (
            <div className="account-page__actions">
              <button
                type="button"
                className="account-page__button account-page__button--primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Guardando..." : "Guardar cambios"}
              </button>
              <button
                type="button"
                className="account-page__button account-page__button--outline"
                onClick={() => {
                  setIsEditing(false);
                  setForm({ name: displayName, phone, birthdate });
                  setError("");
                }}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="account-page__button account-page__button--outline"
              onClick={() => setIsEditing(true)}
            >
              Editar Información
            </button>
          )}
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
