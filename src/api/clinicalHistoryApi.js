const safeJsonParse = (raw) => {
  try {
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const safeJsonStringify = (value) => {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};

const createDefaultClinicalHistory = ({ name, email, age }) => {
  const now = new Date();

  return {
    profile: {
      name: name || "",
      email: email || "",
      age: typeof age === "number" ? age : null,
    },
    medical: {
      conditions: {
        embarazo: false,
        hipertension: false,
        diabetes: false,
        problemasCardiacos: false,
        lesionesRecientes: false,
        varices: false,
        migraña: false,
      },
      allergies: "",
      medications: "",
      contraindications: "",
      clinicalAlerts: "",
      adverseReactions: "",
      followUpNotes: "",
    },
    spaPreferences: {
      primaryGoal: "relajacion",
      favoriteTreatments: [],
      pressure: "media",
      aromas: [],
      sensitiveZones: [],
    },
    treatmentsHistory: [
      {
        id: "treat-1",
        name: "Masaje relajante",
        date: now.toISOString(),
        therapistNotes: "",
      },
    ],
    internal: {
      sessionObservations: [],
    },
    meta: {
      updatedAt: now.toISOString(),
    },
  };
};

const readKey = (key, fallback) => {
  const raw = window.localStorage.getItem(key);
  const parsed = safeJsonParse(raw);
  return parsed || fallback;
};

const writeKey = (key, value) => {
  window.localStorage.setItem(key, safeJsonStringify(value));
};

export const clinicalKeyForCurrentUser = (email) =>
  `clinicalHistory:user:${String(email || "unknown").toLowerCase()}`;

export const clinicalKeyForClientId = (id) =>
  `clinicalHistory:client:${String(id || "unknown")}`;

export const getMyClinicalHistory = ({ name, email }) => {
  const key = clinicalKeyForCurrentUser(email);
  const fallback = createDefaultClinicalHistory({ name, email });
  return readKey(key, fallback);
};

export const saveMyClinicalHistory = ({ email }, data) => {
  const key = clinicalKeyForCurrentUser(email);
  const next = {
    ...data,
    meta: {
      ...(data?.meta || {}),
      updatedAt: new Date().toISOString(),
    },
  };
  writeKey(key, next);
  return next;
};

export const getClientClinicalHistory = ({ id }) => {
  const key = clinicalKeyForClientId(id);
  const fallback = createDefaultClinicalHistory({
    name: `Clienta ${id}`,
    email: "",
  });
  return readKey(key, fallback);
};

export const saveClientClinicalHistory = ({ id }, data) => {
  const key = clinicalKeyForClientId(id);
  const next = {
    ...data,
    meta: {
      ...(data?.meta || {}),
      updatedAt: new Date().toISOString(),
    },
  };
  writeKey(key, next);
  return next;
};
