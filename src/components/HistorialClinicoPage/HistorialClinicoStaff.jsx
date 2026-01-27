import React, { useMemo, useState } from "react";
import { Save, Plus } from "lucide-react";
import MultiSelectPicker from "./MultiSelectPicker";

const CONDITIONS = [
  { key: "embarazo", label: "Embarazo" },
  { key: "hipertension", label: "Hipertensión" },
  { key: "diabetes", label: "Diabetes" },
  { key: "problemasCardiacos", label: "Problemas cardíacos" },
  { key: "lesionesRecientes", label: "Lesiones recientes" },
  { key: "varices", label: "Várices" },
  { key: "migraña", label: "Migraña" },
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

const toggleInList = (list, value) => {
  const set = new Set(list || []);
  if (set.has(value)) set.delete(value);
  else set.add(value);
  return Array.from(set);
};

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
  const [draft, setDraft] = useState(data);
  const [newObservation, setNewObservation] = useState({
    date: new Date().toISOString().slice(0, 10),
    text: "",
  });
  const [newTreatment, setNewTreatment] = useState({
    name: "",
    date: new Date().toISOString().slice(0, 10),
    therapistNotes: "",
  });

  const profileName = useMemo(() => draft?.profile?.name || "", [draft]);

  const updateMedical = (patch) => {
    setDraft((prev) => ({
      ...prev,
      medical: { ...(prev?.medical || {}), ...patch },
    }));
  };

  const updatePreferences = (patch) => {
    setDraft((prev) => ({
      ...prev,
      spaPreferences: { ...(prev?.spaPreferences || {}), ...patch },
    }));
  };

  const updateConditions = (key, nextValue) => {
    setDraft((prev) => ({
      ...prev,
      medical: {
        ...(prev?.medical || {}),
        conditions: {
          ...(prev?.medical?.conditions || {}),
          [key]: nextValue,
        },
      },
    }));
  };

  const addObservation = () => {
    if (!newObservation.text.trim()) return;

    const entry = {
      id: `obs-${Date.now()}`,
      date: new Date(newObservation.date).toISOString(),
      text: newObservation.text.trim(),
    };

    setDraft((prev) => ({
      ...prev,
      internal: {
        ...(prev?.internal || {}),
        sessionObservations: [
          entry,
          ...(prev?.internal?.sessionObservations || []),
        ],
      },
    }));

    setNewObservation((prev) => ({ ...prev, text: "" }));
  };

  const addTreatment = () => {
    if (!newTreatment.name.trim()) return;

    const entry = {
      id: `treat-${Date.now()}`,
      name: newTreatment.name.trim(),
      date: new Date(newTreatment.date).toISOString(),
      therapistNotes: newTreatment.therapistNotes || "",
    };

    setDraft((prev) => ({
      ...prev,
      treatmentsHistory: [entry, ...(prev?.treatmentsHistory || [])],
    }));

    setNewTreatment({
      name: "",
      date: new Date().toISOString().slice(0, 10),
      therapistNotes: "",
    });
  };

  const handleSave = () => {
    onSave?.(draft);
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
            Vista staff • ID: {clientId || "—"}
          </p>
        </header>

        <div className="clinical-fields">
          <div className="clinical-field">
            <p className="clinical-field__label">Nombre</p>
            <p className="clinical-field__value">{profileName || "—"}</p>
          </div>
          <div className="clinical-field">
            <p className="clinical-field__label">Edad</p>
            <p className="clinical-field__value">
              {typeof draft?.profile?.age === "number"
                ? `${draft.profile.age} años`
                : "—"}
            </p>
          </div>
        </div>
      </article>

      <article className="clinical-card" aria-label="Alergias y medicamentos">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Alergias y medicamentos</h2>
          <p className="clinical-card__subtitle">
            Campos editables por staff (para completar y validar).
          </p>
        </header>

        <div className="clinical-form">
          <label className="clinical-form__label">
            Alergias
            <textarea
              className="clinical-form__textarea"
              value={draft?.medical?.allergies || ""}
              onChange={(e) => updateMedical({ allergies: e.target.value })}
              rows={3}
              placeholder="Ej. fragancias, látex, aceites..."
            />
          </label>

          <label className="clinical-form__label">
            Medicamentos actuales
            <textarea
              className="clinical-form__textarea"
              value={draft?.medical?.medications || ""}
              onChange={(e) => updateMedical({ medications: e.target.value })}
              rows={3}
              placeholder="Ej. anticoagulantes, antiinflamatorios..."
            />
          </label>
        </div>
      </article>

      <article className="clinical-card" aria-label="Preferencias de spa">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Preferencias de spa</h2>
          <p className="clinical-card__subtitle">
            Puedes ajustar preferencias junto a la clienta.
          </p>
        </header>

        <div className="clinical-form">
          <label className="clinical-form__label">
            Objetivo principal
            <select
              className="clinical-form__select"
              value={draft?.spaPreferences?.primaryGoal || "relajacion"}
              onChange={(e) =>
                updatePreferences({ primaryGoal: e.target.value })
              }
            >
              {GOALS.map((g) => (
                <option key={g.value} value={g.value}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>

          <label className="clinical-form__label">
            Presión preferida
            <select
              className="clinical-form__select"
              value={draft?.spaPreferences?.pressure || "media"}
              onChange={(e) => updatePreferences({ pressure: e.target.value })}
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
            value={draft?.spaPreferences?.favoriteTreatments || []}
            onChange={(nextList) =>
              updatePreferences({ favoriteTreatments: nextList })
            }
          />

          <MultiSelectPicker
            label="Aromas"
            options={AROMAS}
            value={draft?.spaPreferences?.aromas || []}
            onChange={(nextList) => updatePreferences({ aromas: nextList })}
          />

          <MultiSelectPicker
            label="Zonas sensibles"
            options={SENSITIVE_ZONES}
            value={draft?.spaPreferences?.sensitiveZones || []}
            onChange={(nextList) =>
              updatePreferences({ sensitiveZones: nextList })
            }
          />
        </div>
      </article>

      <article className="clinical-card" aria-label="Condiciones y alertas">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Contraindicaciones y alertas</h2>
          <p className="clinical-card__subtitle">
            Campos clínicos editables por staff.
          </p>
        </header>

        <div className="clinical-checkbox-grid">
          {CONDITIONS.map((c) => (
            <label key={c.key} className="clinical-check">
              <input
                type="checkbox"
                checked={Boolean(draft?.medical?.conditions?.[c.key])}
                onChange={(e) => updateConditions(c.key, e.target.checked)}
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>

        <div className="clinical-form" style={{ marginTop: "1rem" }}>
          <label className="clinical-form__label">
            Contraindicaciones médicas
            <textarea
              className="clinical-form__textarea"
              value={draft?.medical?.contraindications || ""}
              onChange={(e) =>
                updateMedical({ contraindications: e.target.value })
              }
              rows={3}
              placeholder="Ej. evitar calor local, no drenaje profundo..."
            />
          </label>

          <label className="clinical-form__label">
            Alertas clínicas
            <textarea
              className="clinical-form__textarea"
              value={draft?.medical?.clinicalAlerts || ""}
              onChange={(e) =>
                updateMedical({ clinicalAlerts: e.target.value })
              }
              rows={3}
              placeholder="Ej. presión baja, zona lumbar sensible, etc."
            />
          </label>

          <label className="clinical-form__label">
            Reacciones adversas previas
            <textarea
              className="clinical-form__textarea"
              value={draft?.medical?.adverseReactions || ""}
              onChange={(e) =>
                updateMedical({ adverseReactions: e.target.value })
              }
              rows={3}
              placeholder="Ej. irritación por aroma, mareo post-sesión..."
            />
          </label>

          <label className="clinical-form__label">
            Notas de seguimiento
            <textarea
              className="clinical-form__textarea"
              value={draft?.medical?.followUpNotes || ""}
              onChange={(e) => updateMedical({ followUpNotes: e.target.value })}
              rows={3}
              placeholder="Indicaciones para la próxima sesión..."
            />
          </label>
        </div>
      </article>

      <article className="clinical-card" aria-label="Observaciones internas">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Observaciones internas</h2>
          <p className="clinical-card__subtitle">
            Agrega observaciones por sesión.
          </p>
        </header>

        <div className="clinical-inline-form">
          <label className="clinical-form__label">
            Fecha
            <input
              className="clinical-form__input"
              type="date"
              value={newObservation.date}
              onChange={(e) =>
                setNewObservation((prev) => ({ ...prev, date: e.target.value }))
              }
            />
          </label>
          <label className="clinical-form__label" style={{ flex: 1 }}>
            Observación
            <input
              className="clinical-form__input"
              type="text"
              value={newObservation.text}
              onChange={(e) =>
                setNewObservation((prev) => ({ ...prev, text: e.target.value }))
              }
              placeholder="Ej. tolerancia a presión, zonas a evitar..."
            />
          </label>
          <button
            type="button"
            className="clinical-button clinical-button--outline"
            onClick={addObservation}
          >
            <Plus size={16} />
            Agregar
          </button>
        </div>

        <ul className="clinical-timeline">
          {(draft?.internal?.sessionObservations || []).map((o) => (
            <li key={o.id || `${o.date}-${o.text}`} className="clinical-entry">
              <p className="clinical-entry__title">{o.text}</p>
              <p className="clinical-entry__meta">{formatDate(o.date)}</p>
            </li>
          ))}
        </ul>
      </article>

      <article className="clinical-card" aria-label="Historial de tratamientos">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Historial de tratamientos</h2>
          <p className="clinical-card__subtitle">
            Incluye notas del terapeuta.
          </p>
        </header>

        <div className="clinical-form">
          <div className="clinical-inline-form">
            <label className="clinical-form__label" style={{ flex: 1 }}>
              Tratamiento
              <input
                className="clinical-form__input"
                type="text"
                value={newTreatment.name}
                onChange={(e) =>
                  setNewTreatment((prev) => ({ ...prev, name: e.target.value }))
                }
                placeholder="Ej. Masaje relajante"
              />
            </label>
            <label className="clinical-form__label">
              Fecha
              <input
                className="clinical-form__input"
                type="date"
                value={newTreatment.date}
                onChange={(e) =>
                  setNewTreatment((prev) => ({ ...prev, date: e.target.value }))
                }
              />
            </label>
          </div>

          <label className="clinical-form__label">
            Notas del terapeuta
            <textarea
              className="clinical-form__textarea"
              value={newTreatment.therapistNotes}
              onChange={(e) =>
                setNewTreatment((prev) => ({
                  ...prev,
                  therapistNotes: e.target.value,
                }))
              }
              rows={3}
              placeholder="Ej. zonas trabajadas, reacción, recomendaciones..."
            />
          </label>

          <button
            type="button"
            className="clinical-button clinical-button--outline"
            onClick={addTreatment}
          >
            <Plus size={16} />
            Agregar al historial
          </button>
        </div>

        <ul className="clinical-timeline">
          {(draft?.treatmentsHistory || []).map((t) => (
            <li key={t.id || `${t.name}-${t.date}`} className="clinical-entry">
              <p className="clinical-entry__title">{t?.name || "—"}</p>
              <p className="clinical-entry__meta">{formatDate(t?.date)}</p>
              {t?.therapistNotes ? (
                <p className="clinical-entry__notes">{t.therapistNotes}</p>
              ) : null}
            </li>
          ))}
        </ul>
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
