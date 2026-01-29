const API_BASE = import.meta.env.VITE_API_BASE_URL || "/api";

function getAuthToken() {
  if (typeof window === "undefined") return null;
  try {
    const stored = window.localStorage.getItem("lotus_auth");
    if (!stored) return null;
    const parsed = JSON.parse(stored);
    return parsed?.token || null;
  } catch {
    return null;
  }
}

async function authFetch(path, options = {}) {
  const token = getAuthToken();
  if (!token) {
    const error = new Error(
      "No hay token de autenticación. Inicia sesión para continuar.",
    );
    error.status = 401;
    throw error;
  }

  if (token === "dev-token") {
    const error = new Error(
      "Tu sesión es de desarrollo (dev-token) y no es válida para el backend. Inicia sesión real o usa ?devAuth=off.",
    );
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

const emptyClinicalHistory = () => ({
  userEditable: {
    allergies: "",
    currentMedications: "",
    spaPreferences: {
      goal: "relajacion",
      pressure: "media",
      favoriteTreatments: [],
      preferredAromas: [],
      sensitiveZones: [],
    },
  },
  updatedAt: null,
});

const coerceUserEditableBody = (data) => {
  if (!data || typeof data !== "object") return { userEditable: {} };
  if (data.userEditable && typeof data.userEditable === "object") {
    return { userEditable: data.userEditable };
  }

  // Backwards-compat: accept legacy UI shape
  const allergies = data?.medical?.allergies;
  const medications = data?.medical?.medications;
  const spa = data?.spaPreferences || {};

  return {
    userEditable: {
      allergies,
      currentMedications: medications,
      spaPreferences: {
        goal: spa?.primaryGoal,
        pressure: spa?.pressure,
        favoriteTreatments: spa?.favoriteTreatments,
        preferredAromas: spa?.aromas,
        sensitiveZones: spa?.sensitiveZones,
      },
    },
  };
};

export const clinicalKeyForCurrentUser = (email) =>
  `clinicalHistory:user:${String(email || "unknown").toLowerCase()}`;

export const clinicalKeyForClientId = (id) =>
  `clinicalHistory:client:${String(id || "unknown")}`;

// GET /api/users/clinical-history
export const getMyClinicalHistory = async () => {
  const data = await authFetch("/users/clinical-history", { method: "GET" });
  return data?.clinicalHistory || emptyClinicalHistory();
};

// PUT /api/users/clinical-history
export const saveMyClinicalHistory = async (_user, patch) => {
  const body = coerceUserEditableBody(patch);
  const data = await authFetch("/users/clinical-history", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return data?.clinicalHistory || emptyClinicalHistory();
};

// GET /api/admin/users/:id/clinical-history
export const getClientClinicalHistory = async ({ id }) => {
  const data = await authFetch(`/admin/users/${id}/clinical-history`, {
    method: "GET",
  });
  return {
    user: data?.user || { id, name: "", email: "" },
    clinicalHistory: data?.clinicalHistory || emptyClinicalHistory(),
  };
};

// PUT /api/admin/users/:id/clinical-history
export const saveClientClinicalHistory = async ({ id }, patch) => {
  const src = patch && typeof patch === "object" ? patch : {};
  const body = {
    ...(src.userEditable ? { userEditable: src.userEditable } : {}),
    ...(src.staffOnly ? { staffOnly: src.staffOnly } : {}),
  };

  await authFetch(`/admin/users/${id}/clinical-history`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return getClientClinicalHistory({ id });
};
