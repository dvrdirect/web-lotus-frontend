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

async function adminFetch(path, options = {}) {
  const token = getAuthToken();
  if (!token) {
    const error = new Error("No hay token de autenticación");
    error.status = 401;
    throw error;
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
    const error = new Error(errorText || "La solicitud no se pudo completar.");
    error.status = response.status;
    throw error;
  }

  return response.json();
}

export async function findAdminUser({ email, id }) {
  const params = new URLSearchParams();
  if (email) params.set("email", email);
  if (id) params.set("id", id);
  return adminFetch(`/admin/user?${params.toString()}`, { method: "GET" });
}

export async function addPastAppointment({ userId, date, service, notes }) {
  return adminFetch("/admin/add-past-appointment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, date, service, notes }),
  });
}
