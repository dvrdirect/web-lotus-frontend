import React, { createContext, useContext, useState, useEffect } from "react";
import { loginWithGoogleIdToken } from "../api/authApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  // Verifica sesión guardada sin bloquear el primer render (Hero se monta igual)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("lotus_auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.user) {
          setIsLoggedIn(true);
          setUserData(parsed.user);
        }
      }
    } catch (e) {
      // Si algo falla leyendo localStorage, seguimos con sesión limpia
      console.error("Error leyendo sesión de Lotus Spa", e);
    }
  }, []);

  const login = (user) => {
    setIsLoggedIn(true);
    setUserData(user);
    try {
      window.localStorage.setItem("lotus_auth", JSON.stringify({ user }));
    } catch (e) {
      console.error("No se pudo guardar la sesión de Lotus Spa", e);
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    try {
      window.localStorage.removeItem("lotus_auth");
    } catch (e) {
      console.error("No se pudo limpiar la sesión de Lotus Spa", e);
    }
  };

  const loginWithGoogle = async (idToken) => {
    try {
      const { user, token } = await loginWithGoogleIdToken(idToken);
      setIsLoggedIn(true);
      setUserData(user);
      try {
        window.localStorage.setItem(
          "lotus_auth",
          JSON.stringify({ user, token })
        );
      } catch (e) {
        console.error("No se pudo guardar la sesión de Lotus Spa", e);
      }
      return { success: true };
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userData, login, logout, loginWithGoogle }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
