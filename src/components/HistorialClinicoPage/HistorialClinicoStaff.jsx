import React, { useEffect, useMemo, useState } from "react";
import { Save } from "lucide-react";
import MultiSelectPicker from "./MultiSelectPicker";

const CONDITIONS = [
  { key: "pregnant", label: "Embarazo" },
  { key: "hypertension", label: "Hipertensión" },
  { key: "diabetes", label: "Diabetes" },
  { key: "heartProblems", label: "Problemas cardíacos" },
  { key: "recentInjuries", label: "Lesiones recientes" },
  { key: "migraine", label: "Migraña" },
];

const GOALS = [
  { value: "relajacion", label: "Relajación" },
  { value: "descontracturante", label: "Descontracturante" },
  { value: "drenaje", label: "Drenaje" },
  { value: "facial", label: "Cuidado facial" },
];

const PRESSURES = [
  { value: "suave", label: "Suave" },
  { value: "media", label: "Media" },
  { value: "fuerte", label: "Fuerte" },
];

const FAVORITE_TREATMENTS = [
  "Masaje relajante",
  "Masaje descontracturante",
  "Facial hidratante",
  "Drenaje linfático",
  "Reflexología",
];

const AROMAS = ["Lavanda", "Eucalipto", "Vainilla", "Cítricos", "Rosas"];

const SENSITIVE_ZONES = [
  "Cuello",
  "Hombros",
  "Espalda baja",
  "Rodillas",
  "Pies",
];

const defaultClinicalHistory = () => ({
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
  staffOnly: {
    medicalConditions: {
      pregnant: false,
      diabetes: false,
      hypertension: false,
      heartProblems: false,
      recentInjuries: false,
      migraine: false,
    },
    internalNotes: "",
  },
  updatedAt: null,
});

const formatDate = (value) => {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("es-MX", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

function HistorialClinicoStaff({ data, onSave, clientId }) {
  const initial = useMemo(
    () => data?.clinicalHistory || defaultClinicalHistory(),
    [data],
  );
  const [draft, setDraft] = useState(initial);

  useEffect(() => {
    setDraft(initial);
  }, [initial]);

  const user = data?.user;

  const updateUserEditable = (patch) => {
    setDraft((prev) => ({
      ...prev,
      userEditable: { ...(prev?.userEditable || {}), ...patch },
    }));
  };

  const updateSpaPreferences = (patch) => {
    setDraft((prev) => ({
      ...prev,
      userEditable: {
        ...(prev?.userEditable || {}),
        spaPreferences: {
          ...(prev?.userEditable?.spaPreferences || {}),
          ...patch,
        },
      },
    }));
  };

  const updateCondition = (key, nextValue) => {
    setDraft((prev) => ({
      ...prev,
      staffOnly: {
        ...(prev?.staffOnly || {}),
        medicalConditions: {
          ...(prev?.staffOnly?.medicalConditions || {}),
          [key]: nextValue,
        },
      },
    }));
  };

  const updateInternalNotes = (value) => {
    setDraft((prev) => ({
      ...prev,
      staffOnly: { ...(prev?.staffOnly || {}), internalNotes: value },
    }));
  };

  const handleSave = () => {
    onSave?.({
      userEditable: draft?.userEditable || {},
      staffOnly: draft?.staffOnly || {},
    });
  };

  return (
    <section
      className="clinical-page__grid"
      aria-label="Historial clínico staff"
    >
      <article className="clinical-card" aria-label="Cliente">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Clienta</h2>
          <p className="clinical-card__subtitle">
            Vista staff • ID: {clientId || user?.id || "—"}
          </p>
        </header>

        <div className="clinical-fields">
          <div className="clinical-field">
            <p className="clinical-field__label">Nombre</p>
            <p className="clinical-field__value">{user?.name || "—"}</p>
          </div>
          <div className="clinical-field">
            <p className="clinical-field__label">Email</p>
            <p className="clinical-field__value">{user?.email || "—"}</p>
          </div>
          <div className="clinical-field">
            <p className="clinical-field__label">Última actualización</p>
            <p className="clinical-field__value">
              {formatDate(draft?.updatedAt) || "—"}
            </p>
          </div>
        </div>
      </article>

      <article className="clinical-card" aria-label="Condiciones médicas">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Condiciones médicas</h2>
          <p className="clinical-card__subtitle">Campos internos (staff).</p>
        </header>

        <div className="clinical-checkbox-grid">
          {CONDITIONS.map((c) => (
            <label key={c.key} className="clinical-check">
              <input
                type="checkbox"
                checked={Boolean(draft?.staffOnly?.medicalConditions?.[c.key])}
                onChange={(e) => updateCondition(c.key, e.target.checked)}
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>
      </article>

      <article className="clinical-card" aria-label="Alergias y medicamentos">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Alergias y medicamentos</h2>
          <p className="clinical-card__subtitle">Campos editables.</p>
        </header>

        <div className="clinical-form">
          <label className="clinical-form__label">
            Alergias
            <textarea
              className="clinical-form__textarea"
              value={draft?.userEditable?.allergies || ""}
              onChange={(e) =>
                updateUserEditable({ allergies: e.target.value })
              }
              rows={3}
              placeholder="Ej. fragancias, látex, aceites..."
            />
          </label>

          <label className="clinical-form__label">
            Medicamentos actuales
            <textarea
              className="clinical-form__textarea"
              value={draft?.userEditable?.currentMedications || ""}
              onChange={(e) =>
                updateUserEditable({ currentMedications: e.target.value })
              }
              rows={3}
              placeholder="Ej. anticoagulantes, antiinflamatorios..."
            />
          </label>
        </div>
      </article>

      <article className="clinical-card" aria-label="Preferencias de spa">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Preferencias de spa</h2>
          <p className="clinical-card__subtitle">Ajustes con la clienta.</p>
        </header>

        <div className="clinical-form">
          <label className="clinical-form__label">
            Objetivo
            <select
              className="clinical-form__select"
              value={draft?.userEditable?.spaPreferences?.goal || "relajacion"}
              onChange={(e) => updateSpaPreferences({ goal: e.target.value })}
            >
              {GOALS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>

          <label className="clinical-form__label">
            Presión
            <select
              className="clinical-form__select"
              value={draft?.userEditable?.spaPreferences?.pressure || "media"}
              onChange={(e) =>
                updateSpaPreferences({ pressure: e.target.value })
              }
            >
              {PRESSURES.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </label>

          <MultiSelectPicker
            label="Tratamientos favoritos"
            options={FAVORITE_TREATMENTS}
            value={
              draft?.userEditable?.spaPreferences?.favoriteTreatments || []
            }
            onChange={(nextList) =>
              updateSpaPreferences({ favoriteTreatments: nextList })
            }
          />

          <MultiSelectPicker
            label="Aromas preferidos"
            options={AROMAS}
            value={draft?.userEditable?.spaPreferences?.preferredAromas || []}
            onChange={(nextList) =>
              updateSpaPreferences({ preferredAromas: nextList })
            }
          />

          <MultiSelectPicker
            label="Zonas sensibles"
            options={SENSITIVE_ZONES}
            value={draft?.userEditable?.spaPreferences?.sensitiveZones || []}
            onChange={(nextList) =>
              updateSpaPreferences({ sensitiveZones: nextList })
            }
          />
        </div>
      </article>

      <article className="clinical-card" aria-label="Notas internas">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Notas internas</h2>
          <p className="clinical-card__subtitle">
            Visible solo para staff/admin.
          </p>
        </header>

        <div className="clinical-form">
          <label className="clinical-form__label">
            Observaciones
            <textarea
              className="clinical-form__textarea"
              value={draft?.staffOnly?.internalNotes || ""}
              onChange={(e) => updateInternalNotes(e.target.value)}
              rows={5}
              placeholder="Notas internas del staff..."
            />
          </label>
        </div>
      </article>

      <div className="clinical-footer">
        <button
          type="button"
          className="clinical-button clinical-button--primary"
          onClick={handleSave}
        >
          <Save size={16} />
          Guardar cambios clínicos
        </button>
      </div>
    </section>
  );
}

export default HistorialClinicoStaff;
