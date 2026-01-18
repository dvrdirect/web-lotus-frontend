const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem("lotus_auth");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.token || null;
  } catch (e) {
    console.error("No se pudo leer el token de autenticación", e);
    return null;
  }
}

export async function authorizedFetch(path, options = {}) {
  const token = getAuthToken();
  if (!token) {
    throw new Error(
      "No hay token de autenticación. Inicia sesión para continuar.",
    );
  }

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`,
  };

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    throw new Error(
      errorText || "La solicitud al servidor de reservas no se pudo completar.",
    );
  }

  return response.json();
}

// GET /api/reservations - obtiene las reservas del usuario autenticado
export async function getReservations() {
  return authorizedFetch("/reservations", { method: "GET" });
}

// POST /api/reservations - crea una nueva reserva para el usuario autenticado
export async function createReservation({ serviceName, scheduledAt, notes }) {
  return authorizedFetch("/reservations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ serviceName, scheduledAt, notes }),
  });
}
