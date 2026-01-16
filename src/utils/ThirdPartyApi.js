// Utilidades para trabajar con servicios de terceros en el frontend
// En este proyecto: validación / inspección de tokens de Google Auth.
// Importante: la verificación de seguridad final debe hacerse SIEMPRE en el backend.

const GOOGLE_TOKEN_INFO_ENDPOINT = "https://oauth2.googleapis.com/tokeninfo";

// En Vite, el clientId suele venir de import.meta.env.VITE_GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

/**
 * Consulta el endpoint oficial de Google para obtener información sobre un ID token.
 * Útil para diagnósticos o para mostrar datos básicos del perfil en frontend.
 *
 * IMPORTANTE: No uses esto como única verificación de seguridad; el backend
 * debe validar el token antes de crear la sesión real.
 *
 * @param {string} idToken - ID token JWT recibido del flujo de Google.
 * @returns {Promise<object>} - Payload del token (sub, email, name, picture, etc.).
 * @throws {Error} - Si el token es inválido o la llamada falla.
 */
export async function fetchGoogleTokenInfo(idToken) {
  if (!idToken || typeof idToken !== "string") {
    throw new Error("ID token de Google inválido o ausente.");
  }

  const url = `${GOOGLE_TOKEN_INFO_ENDPOINT}?id_token=${encodeURIComponent(
    idToken,
  )}`;

  const response = await fetch(url);

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(
      text || "No se pudo obtener información del ID token de Google.",
    );
  }

  const payload = await response.json();

  // Comprobación suave del aud en el frontend (sólo informativa)
  if (GOOGLE_CLIENT_ID && payload.aud !== GOOGLE_CLIENT_ID) {
    console.warn(
      "El ID token de Google no coincide con el clientId configurado en el frontend.",
    );
  }

  return payload;
}

/**
 * Normaliza el payload de Google a un objeto de perfil ligero para el UI.
 *
 * @param {object} payload - Resultado de fetchGoogleTokenInfo().
 * @returns {{ provider: string, providerId: string, email: string|null, name: string, picture: string|null }}
 */
export function mapGooglePayloadToProfile(payload) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload de Google inválido.");
  }

  return {
    provider: "google",
    providerId: payload.sub,
    email: payload.email || null,
    name: payload.name || payload.given_name || "Invitada Google",
    picture: payload.picture || null,
  };
}
