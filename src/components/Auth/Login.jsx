import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const result = await signin({ email, password });
      if (!result.success) {
        setError("Correo o contraseña incorrectos.");
      }
    } catch (e) {
      console.error("Error al iniciar sesión", e);
      setError("No se pudo iniciar sesión. Inténtalo más tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-page__card">
        <h1 className="auth-page__title">Inicia sesión</h1>
        <p className="auth-page__subtitle">
          Accede a tu espacio personal de Lotus Spa.
        </p>

        <form onSubmit={handleSubmit} className="auth-page__form">
          <label className="auth-page__label" htmlFor="login-email">
            Correo electrónico
          </label>
          <input
            id="login-email"
            type="email"
            className="auth-page__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className="auth-page__label" htmlFor="login-password">
            Contraseña
          </label>
          <input
            id="login-password"
            type="password"
            className="auth-page__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {error && <p className="auth-page__error">{error}</p>}

          <button
            type="submit"
            className="auth-page__button"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Login;
