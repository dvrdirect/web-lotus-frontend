import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Las contraseñas deben coincidir.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await signup({ name, email, password });
      if (!result.success) {
        setError("No se pudo completar el registro.");
      }
    } catch (e) {
      console.error("Error en registro", e);
      setError("No se pudo completar el registro. Inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-page__card">
        <h1 className="auth-page__title">Crear cuenta</h1>
        <p className="auth-page__subtitle">
          Regístrate para guardar tu historial y reservas.
        </p>

        <form onSubmit={handleSubmit} className="auth-page__form">
          <label className="auth-page__label" htmlFor="register-name">
            Nombre completo
          </label>
          <input
            id="register-name"
            type="text"
            className="auth-page__input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <label className="auth-page__label" htmlFor="register-email">
            Correo electrónico
          </label>
          <input
            id="register-email"
            type="email"
            className="auth-page__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth-page__label" htmlFor="register-password">
            Contraseña
          </label>
          <input
            id="register-password"
            type="password"
            className="auth-page__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label
            className="auth-page__label"
            htmlFor="register-confirm-password"
          >
            Confirmar contraseña
          </label>
          <input
            id="register-confirm-password"
            type="password"
            className="auth-page__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="auth-page__error">{error}</p>}

          <button
            type="submit"
            className="auth-page__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creando cuenta..." : "Registrarme"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Register;
