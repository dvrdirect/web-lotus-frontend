import React, { createContext, useContext, useState, useEffect } from "react";
import { mainApi } from "../utils/MainApi";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // currentUser: estado global con los datos del usuario autenticado
  const [currentUser, setCurrentUser] = useState(null);

  // Verifica sesión guardada sin bloquear el primer render (Hero se monta igual)
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("lotus_auth");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && parsed.user) {
          setIsLoggedIn(true);
          setCurrentUser(parsed.user);
        }
      }
    } catch (e) {
      // Si algo falla leyendo localStorage, seguimos con sesión limpia
      console.error("Error leyendo sesión de Lotus Spa", e);
    }
  }, []);

  const persistSession = ({ user, token }) => {
    setIsLoggedIn(true);
    setCurrentUser(user);
    try {
      window.localStorage.setItem(
        "lotus_auth",
        JSON.stringify({ user, token }),
      );
    } catch (e) {
      console.error("No se pudo guardar la sesión de Lotus Spa", e);
    }
  };

  const login = (user) => {
    // login "local" sin backend (por si lo sigues usando en alguna parte)
    persistSession({ user, token: null });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    try {
      window.localStorage.removeItem("lotus_auth");
    } catch (e) {
      console.error("No se pudo limpiar la sesión de Lotus Spa", e);
    }
  };

  const loginWithGoogle = async (idToken) => {
    try {
      const { user, token } = await mainApi.loginWithGoogle(idToken);
      persistSession({ user, token });
      return { success: true };
    } catch (error) {
      console.error("Error al iniciar sesión con Google", error);
      return { success: false, error };
    }
  };

  const signup = async ({ name, email, password }) => {
    try {
      await mainApi.register({ name, email, password });
      // tras el registro, iniciamos sesión directamente
      const { token, user } = await mainApi.login({ email, password });
      persistSession({ user: user || { name, email }, token });
      return { success: true };
    } catch (error) {
      console.error("Error en signup", error);
      return { success: false, error };
    }
  };

  const signin = async ({ email, password }) => {
    try {
      const { token, user } = await mainApi.login({ email, password });
      const nameFromEmail = email.split("@")[0] || "Invitado";
      persistSession({
        user: user || { email, name: nameFromEmail },
        token,
      });
      return { success: true };
    } catch (error) {
      console.error("Error en signin", error);
      return { success: false, error };
    }
  };

  const updateProfileLocally = (updates) => {
    setCurrentUser((prev) => {
      const merged = { ...(prev || {}), ...updates };
      try {
        const stored = window.localStorage.getItem("lotus_auth");
        const parsed = stored ? JSON.parse(stored) : null;
        const token = parsed?.token || null;
        window.localStorage.setItem(
          "lotus_auth",
          JSON.stringify({ user: merged, token }),
        );
      } catch (e) {
        console.error("No se pudo actualizar el perfil localmente", e);
      }
      return merged;
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        // currentUser: nombre que pide el enunciado para el estado global
        currentUser,
        // userData se mantiene por compatibilidad con componentes existentes
        userData: currentUser,
        login,
        logout,
        loginWithGoogle,
        signup,
        signin,
        updateProfileLocally,
      }}
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
