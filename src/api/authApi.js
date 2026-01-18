const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

export async function loginWithGoogleIdToken(idToken) {
  const response = await fetch(`${API_BASE}/auth/google`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || "No se pudo iniciar sesión con Google en el servidor.",
    );
  }

  // Se espera que el backend devuelva { user, token }
  const data = await response.json();
  return data;
}

export async function signupWithEmail({ name, email, password }) {
  const response = await fetch(`${API_BASE}/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || "No se pudo completar el registro en el servidor.",
    );
  }

  return response.json();
}

export async function signinWithEmail({ email, password }) {
  const response = await fetch(`${API_BASE}/user/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(errorText || "No se pudo iniciar sesión en el servidor.");
  }

  // backend devuelve { token }
  return response.json();
}
