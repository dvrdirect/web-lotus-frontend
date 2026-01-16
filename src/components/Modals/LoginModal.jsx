import React, { useState, useEffect } from "react";
import "./AuthModal.css";
import { useAuth } from "../../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const LoginModal = ({ open, onClose, onSwitchToSignup }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      setEmail("");
      setPassword("");
      setErrors({});
    }
  }, [open]);

  if (!open) return null;

  const validateValues = (values) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!emailRegex.test(values.email.trim())) {
      newErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.";
    }

    return newErrors;
  };

  const handleEmailChange = (value) => {
    const updated = { email: value, password };
    setEmail(value);
    const fieldErrors = validateValues(updated);
    setErrors((prev) => ({ ...prev, email: fieldErrors.email }));
  };

  const handlePasswordChange = (value) => {
    const updated = { email, password: value };
    setPassword(value);
    const fieldErrors = validateValues(updated);
    setErrors((prev) => ({ ...prev, password: fieldErrors.password }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateValues({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const nameFromEmail = email.split("@")[0] || "Invitado";
    login({ name: nameFromEmail, email });
    onClose();
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      if (!idToken) return;

      if (typeof window !== "undefined" && window.lotusDisableRealGoogle) {
        const fakeName = "Invitada Google";
        login({ name: fakeName, email: "guest-google@example.com" });
        onClose();
        return;
      }

      const { loginWithGoogle } = useAuth();
      const result = await loginWithGoogle(idToken);
      if (result.success) {
        onClose();
      }
    } catch (error) {
      console.error("Error en login con Google", error);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Login falló");
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__overlay" onClick={onClose} />
      <div className="auth-modal__panel auth-modal__panel--login">
        <button
          type="button"
          className="auth-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="auth-modal__header">
          <h2 className="auth-modal__title">Bienvenido de nuevo</h2>
          <p className="auth-modal__subtitle">
            Vuelve a tu espacio de calma para seguir cuidando tu cuerpo y tu
            mente.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="auth-modal__form auth-modal__form--login"
        >
          <div className="auth-modal__field">
            <label htmlFor="login-email" className="auth-modal__label">
              Correo electrónico
            </label>
            <input
              id="login-email"
              type="email"
              className={`auth-modal__input${
                errors.email ? " auth-modal__input--error" : ""
              }`}
              value={email}
              placeholder="Tu mejor email..."
              onChange={(e) => handleEmailChange(e.target.value)}
            />
            {errors.email && (
              <span className="auth-modal__error-message">{errors.email}</span>
            )}
          </div>

          <div className="auth-modal__field">
            <label htmlFor="login-password" className="auth-modal__label">
              Contraseña
            </label>
            <input
              id="login-password"
              type="password"
              className={`auth-modal__input${
                errors.password ? " auth-modal__input--error" : ""
              }`}
              value={password}
              placeholder="Tu contraseña..."
              onChange={(e) => handlePasswordChange(e.target.value)}
            />
            {errors.password && (
              <span className="auth-modal__error-message">
                {errors.password}
              </span>
            )}
          </div>

          <button type="submit" className="auth-modal__button">
            Entrar
          </button>
        </form>

        <div className="auth-modal__divider">o</div>

        <div className="auth-modal__social">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            theme="outline"
            width="260"
          />
        </div>

        <div className="auth-modal__footer">
          ¿Aún no tienes cuenta?
          <button
            type="button"
            className="auth-modal__link"
            onClick={onSwitchToSignup}
          >
            Regístrate
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
