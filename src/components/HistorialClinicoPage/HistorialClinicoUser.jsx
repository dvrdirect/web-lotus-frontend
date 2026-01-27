import React, { useMemo, useState } from "react";
import { Save, Pencil, XCircle } from "lucide-react";
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

const TREATMENTS = [
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

function HistorialClinicoUser({ data, onSave }) {
  const [isEditing, setIsEditing] = useState(false);

  const initialDraft = useMemo(
    () => ({
      allergies: data?.medical?.allergies || "",
      medications: data?.medical?.medications || "",
      spaPreferences: {
        primaryGoal: data?.spaPreferences?.primaryGoal || "relajacion",
        favoriteTreatments: data?.spaPreferences?.favoriteTreatments || [],
        pressure: data?.spaPreferences?.pressure || "media",
        aromas: data?.spaPreferences?.aromas || [],
        sensitiveZones: data?.spaPreferences?.sensitiveZones || [],
      },
    }),
    [data],
  );

  const [draft, setDraft] = useState(initialDraft);

  const startEdit = () => {
    setDraft(initialDraft);
    setIsEditing(true);
  };

  const cancelEdit = () => {
    setDraft(initialDraft);
    setIsEditing(false);
  };

  const handleSave = () => {
    const next = {
      ...data,
      medical: {
        ...(data?.medical || {}),
        allergies: draft.allergies,
        medications: draft.medications,
      },
      spaPreferences: {
        ...(data?.spaPreferences || {}),
        ...draft.spaPreferences,
      },
    };

    onSave?.(next);
    setIsEditing(false);
  };

  const profileName = data?.profile?.name || "";
  const age = data?.profile?.age;

  return (
    <section className="clinical-page__grid" aria-label="Historial clínico">
      <article className="clinical-card" aria-label="Datos personales">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Datos personales</h2>
          <p className="clinical-card__subtitle">Solo información básica.</p>
        </header>

        <div className="clinical-fields">
          <div className="clinical-field">
            <p className="clinical-field__label">Nombre</p>
            <p className="clinical-field__value">{profileName || "—"}</p>
          </div>
          <div className="clinical-field">
            <p className="clinical-field__label">Edad</p>
            <p className="clinical-field__value">
              {typeof age === "number" ? `${age} años` : "—"}
            </p>
          </div>
        </div>
      </article>

      <article className="clinical-card" aria-label="Condiciones médicas">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Condiciones médicas</h2>
          <p className="clinical-card__subtitle">
            Información relevante para tu seguridad.
          </p>
        </header>

        <div className="clinical-checkbox-grid">
          {CONDITIONS.map((c) => (
            <label key={c.key} className="clinical-check">
              <input
                type="checkbox"
                checked={Boolean(data?.medical?.conditions?.[c.key])}
                readOnly
              />
              <span>{c.label}</span>
            </label>
          ))}
        </div>

        <p className="clinical-hint">
          Estas condiciones se configuran por el staff.
        </p>
      </article>

      <article className="clinical-card" aria-label="Alergias y medicamentos">
        <header className="clinical-card__header clinical-card__header--row">
          <div>
            <h2 className="clinical-card__title">Alergias y medicamentos</h2>
            <p className="clinical-card__subtitle">
              Puedes editar tus alergias y medicamentos actuales.
            </p>
          </div>

          {!isEditing ? (
            <button
              type="button"
              className="clinical-button clinical-button--outline"
              onClick={startEdit}
            >
              <Pencil size={16} />
              Editar
            </button>
          ) : (
            <div className="clinical-actions">
              <button
                type="button"
                className="clinical-button clinical-button--ghost"
                onClick={cancelEdit}
              >
                <XCircle size={16} />
                Cancelar
              </button>
              <button
                type="button"
                className="clinical-button clinical-button--primary"
                onClick={handleSave}
              >
                <Save size={16} />
                Guardar
              </button>
            </div>
          )}
        </header>

        <div className="clinical-form">
          <label className="clinical-form__label">
            Alergias
            <textarea
              className="clinical-form__textarea"
              value={
                isEditing ? draft.allergies : data?.medical?.allergies || ""
              }
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, allergies: e.target.value }))
              }
              placeholder="Ej. aceite de almendras, fragancias fuertes, látex..."
              disabled={!isEditing}
              rows={3}
            />
          </label>

          <label className="clinical-form__label">
            Medicamentos actuales
            <textarea
              className="clinical-form__textarea"
              value={
                isEditing ? draft.medications : data?.medical?.medications || ""
              }
              onChange={(e) =>
                setDraft((prev) => ({ ...prev, medications: e.target.value }))
              }
              placeholder="Ej. antiinflamatorios, anticoagulantes, etc."
              disabled={!isEditing}
              rows={3}
            />
          </label>
        </div>
      </article>

      <article className="clinical-card" aria-label="Preferencias de spa">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Preferencias de spa</h2>
          <p className="clinical-card__subtitle">
            Personaliza tu experiencia. Puedes editar esta sección.
          </p>
        </header>

        <div className="clinical-form">
          <label className="clinical-form__label">
            Objetivo principal
            <select
              className="clinical-form__select"
              value={
                (isEditing
                  ? draft.spaPreferences.primaryGoal
                  : data?.spaPreferences?.primaryGoal) || "relajacion"
              }
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  spaPreferences: {
                    ...prev.spaPreferences,
                    primaryGoal: e.target.value,
                  },
                }))
              }
              disabled={!isEditing}
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
              value={
                (isEditing
                  ? draft.spaPreferences.pressure
                  : data?.spaPreferences?.pressure) || "media"
              }
              onChange={(e) =>
                setDraft((prev) => ({
                  ...prev,
                  spaPreferences: {
                    ...prev.spaPreferences,
                    pressure: e.target.value,
                  },
                }))
              }
              disabled={!isEditing}
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
            options={TREATMENTS}
            value={
              (isEditing
                ? draft.spaPreferences.favoriteTreatments
                : data?.spaPreferences?.favoriteTreatments) || []
            }
            disabled={!isEditing}
            onChange={(nextList) => {
              setDraft((prev) => ({
                ...prev,
                spaPreferences: {
                  ...prev.spaPreferences,
                  favoriteTreatments: nextList,
                },
              }));
            }}
          />

          <MultiSelectPicker
            label="Aromas preferidos"
            options={AROMAS}
            value={
              (isEditing
                ? draft.spaPreferences.aromas
                : data?.spaPreferences?.aromas) || []
            }
            disabled={!isEditing}
            onChange={(nextList) => {
              setDraft((prev) => ({
                ...prev,
                spaPreferences: { ...prev.spaPreferences, aromas: nextList },
              }));
            }}
          />

          <MultiSelectPicker
            label="Zonas sensibles"
            options={SENSITIVE_ZONES}
            value={
              (isEditing
                ? draft.spaPreferences.sensitiveZones
                : data?.spaPreferences?.sensitiveZones) || []
            }
            disabled={!isEditing}
            onChange={(nextList) => {
              setDraft((prev) => ({
                ...prev,
                spaPreferences: {
                  ...prev.spaPreferences,
                  sensitiveZones: nextList,
                },
              }));
            }}
          />
        </div>

        {!isEditing && (
          <button
            type="button"
            className="clinical-button clinical-button--outline"
            onClick={startEdit}
          >
            <Pencil size={16} />
            Editar preferencias
          </button>
        )}

        {isEditing && (
          <div className="clinical-actions clinical-actions--bottom">
            <button
              type="button"
              className="clinical-button clinical-button--ghost"
              onClick={cancelEdit}
            >
              <XCircle size={16} />
              Cancelar
            </button>
            <button
              type="button"
              className="clinical-button clinical-button--primary"
              onClick={handleSave}
            >
              <Save size={16} />
              Guardar
            </button>
          </div>
        )}
      </article>

      <article className="clinical-card" aria-label="Historial de tratamientos">
        <header className="clinical-card__header">
          <h2 className="clinical-card__title">Historial de tratamientos</h2>
          <p className="clinical-card__subtitle">
            Se muestra nombre y fecha (sin notas internas).
          </p>
        </header>

        <ul className="clinical-timeline">
          {(data?.treatmentsHistory || []).map((t) => {
            const date = t?.date ? new Date(t.date) : null;
            const formatted = date
              ? date.toLocaleDateString("es-MX", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })
              : "";
            return (
              <li
                key={t.id || `${t.name}-${t.date}`}
                className="clinical-entry"
              >
                <p className="clinical-entry__title">{t?.name || "—"}</p>
                <p className="clinical-entry__meta">{formatted}</p>
              </li>
            );
          })}
        </ul>
      </article>
    </section>
  );
}

export default HistorialClinicoUser;
