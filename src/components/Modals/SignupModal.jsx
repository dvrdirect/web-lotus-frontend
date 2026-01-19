import React, { useState, useEffect } from "react";
import "./AuthModal.css";
import Preloader from "../Preloader/Preloader";
import Lottie from "lottie-react";
import successSpa from "../../lotties/check_loading.json";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../../context/AuthContext";

const SignupModal = ({ open, onClose, onSwitchToLogin }) => {
  const { loginWithGoogle, signup } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [step, setStep] = useState("form"); // form | loading | success

  useEffect(() => {
    if (!open) {
      setForm({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});
      setStep("form");
    }
  }, [open]);

  if (!open) return null;

  const validateValues = (values) => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    const phoneRegex = /^\+?[0-9]{7,15}$/;

    if (!values.name.trim()) {
      newErrors.name = "Por favor, escribe tu nombre.";
    }

    if (!emailRegex.test(values.email.trim())) {
      newErrors.email = "Introduce un correo electrónico válido.";
    }

    if (!passwordRegex.test(values.password)) {
      newErrors.password =
        "La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.";
    }

    if (values.confirmPassword !== values.password) {
      newErrors.confirmPassword = "Las contraseñas deben coincidir.";
    }

    if (values.phone && !phoneRegex.test(values.phone.replace(/\s+/g, ""))) {
      newErrors.phone = "Introduce un teléfono válido.";
    }

    return newErrors;
  };

  const handleChange = (field, value) => {
    const updated = { ...form, [field]: value };
    setForm(updated);
    const fieldErrors = validateValues(updated);
    setErrors((prev) => ({ ...prev, [field]: fieldErrors[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateValues(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      setStep("loading");
      const result = await signup({
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (!result.success) {
        setStep("form");
        setErrors({ general: "No se pudo completar el registro." });
        return;
      }
      setStep("success");
      setTimeout(() => {
        if (onSwitchToLogin) {
          onClose();
          onSwitchToLogin();
        } else {
          onClose();
        }
      }, 3000);
    } catch (error) {
      console.error("Error en registro", error);
      setStep("form");
      setErrors({
        general: "No se pudo completar el registro. Inténtalo más tarde.",
      });
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      if (!idToken) return;

      const result = await loginWithGoogle(idToken);
      if (result.success) {
        setStep("success");
        setTimeout(() => {
          onClose();
        }, 2500);
      }
    } catch (error) {
      console.error("Error en registro con Google", error);
    }
  };

  const handleGoogleError = () => {
    console.error("Google Signup falló");
  };

  return (
    <div className="auth-modal">
      <div className="auth-modal__overlay" onClick={onClose} />
      <div className="auth-modal__panel auth-modal__panel--signup">
        <button
          type="button"
          className="auth-modal__close"
          onClick={onClose}
          aria-label="Cerrar"
        >
          ×
        </button>

        <div className="auth-modal__header">
          <h2 className="auth-modal__title">
            Únete a nuestra experiencia de bienestar
          </h2>
          <p className="auth-modal__subtitle">
            Crea tu cuenta para descubrir rituales, promociones y momentos de
            calma diseñados para ti.
          </p>
        </div>

        {step === "form" && (
          <form
            onSubmit={handleSubmit}
            className="auth-modal__form auth-modal__form--signup"
          >
            <div className="auth-modal__field">
              <label htmlFor="signup-name" className="auth-modal__label">
                Nombre completo
              </label>
              <input
                id="signup-name"
                type="text"
                className={`auth-modal__input${
                  errors.name ? " auth-modal__input--error" : ""
                }`}
                value={form.name}
                placeholder="Escribe tu nombre completo..."
                onChange={(e) => handleChange("name", e.target.value)}
              />
              {errors.name && (
                <span className="auth-modal__error-message">{errors.name}</span>
              )}
            </div>

            <div className="auth-modal__field">
              <label htmlFor="signup-email" className="auth-modal__label">
                Correo electrónico
              </label>
              <input
                id="signup-email"
                type="email"
                className={`auth-modal__input${
                  errors.email ? " auth-modal__input--error" : ""
                }`}
                value={form.email}
                placeholder="Tu mejor email..."
                onChange={(e) => handleChange("email", e.target.value)}
              />
              {errors.email && (
                <span className="auth-modal__error-message">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="auth-modal__field">
              <label htmlFor="signup-phone" className="auth-modal__label">
                Teléfono
              </label>
              <input
                id="signup-phone"
                type="tel"
                className={`auth-modal__input${
                  errors.phone ? " auth-modal__input--error" : ""
                }`}
                value={form.phone}
                placeholder="Tu número de contacto (opcional)"
                onChange={(e) => handleChange("phone", e.target.value)}
              />
              {errors.phone && (
                <span className="auth-modal__error-message">
                  {errors.phone}
                </span>
              )}
            </div>

            <div className="auth-modal__field">
              <label htmlFor="signup-password" className="auth-modal__label">
                Contraseña
              </label>
              <input
                id="signup-password"
                type="password"
                className={`auth-modal__input${
                  errors.password ? " auth-modal__input--error" : ""
                }`}
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              {errors.password && (
                <span className="auth-modal__error-message">
                  {errors.password}
                </span>
              )}
            </div>

            <div className="auth-modal__field">
              <label
                htmlFor="signup-confirm-password"
                className="auth-modal__label"
              >
                Confirmar contraseña
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                className={`auth-modal__input${
                  errors.confirmPassword ? " auth-modal__input--error" : ""
                }`}
                value={form.confirmPassword}
                placeholder="Repite tu contraseña..."
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
              {errors.confirmPassword && (
                <span className="auth-modal__error-message">
                  {errors.confirmPassword}
                </span>
              )}
            </div>
            {errors.general && (
              <div className="auth-modal__error-message auth-modal__error-message--general">
                {errors.general}
              </div>
            )}
            <button
              type="submit"
              className="auth-modal__button"
              disabled={Object.keys(validateValues(form)).length > 0}
            >
              Registrarme
            </button>
          </form>
        )}

        {step === "form" && (
          <>
            <div className="auth-modal__divider">o</div>
            <div className="auth-modal__social">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                theme="outline"
                width="260"
              />
            </div>
          </>
        )}

        {step === "loading" && (
          <div className="auth-modal__form auth-modal__form--loading">
            <Preloader />
          </div>
        )}

        {step === "success" && (
          <div className="auth-modal__form auth-modal__form--success">
            <Lottie
              animationData={successSpa}
              loop={false}
              className="auth-modal__success-lottie"
            />
            <h3 className="auth-modal__title">
              ¡Éxito! Tu ritual de bienestar comienza ahora.
            </h3>
          </div>
        )}

        {step === "form" && (
          <div className="auth-modal__footer">
            ¿Ya tienes cuenta?
            <button
              type="button"
              className="auth-modal__link"
              onClick={onSwitchToLogin}
            >
              Entrar
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignupModal;
