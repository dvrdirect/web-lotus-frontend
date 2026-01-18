// MainApi: capa principal para interactuar con el back-end
// Centraliza las solicitudes de autenticación y (opcionalmente) otros recursos.

const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

class MainApi {
  constructor(baseUrl = API_BASE) {
    this._baseUrl = baseUrl;
  }

  async _request(path, options = {}) {
    const response = await fetch(`${this._baseUrl}${path}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      throw new Error(
        errorText || "La solicitud al servidor no se pudo completar.",
      );
    }

    // La mayoría de las rutas devuelven JSON
    return response.json();
  }

  // Registro con email/contraseña
  async register({ name, email, password }) {
    return this._request("/user/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    });
  }

  // Login con email/contraseña
  async login({ email, password }) {
    return this._request("/user/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
  }

  // Login/registro con Google ID token
  async loginWithGoogle(idToken) {
    return this._request("/auth/google", {
      method: "POST",
      body: JSON.stringify({ idToken }),
    });
  }
}

export const mainApi = new MainApi();

export default MainApi;
