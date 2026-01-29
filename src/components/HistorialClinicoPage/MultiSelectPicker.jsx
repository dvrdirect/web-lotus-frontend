import React, { useEffect, useMemo, useState } from "react";

const uniq = (list) =>
  Array.from(new Set((Array.isArray(list) ? list : []).filter(Boolean)));

function MultiSelectPicker({
  label,
  options,
  value,
  onChange,
  disabled = false,
  emptyText = "Aún no hay opciones seleccionadas.",
}) {
  const normalizedOptions = useMemo(() => options || [], [options]);
  const normalizedValue = useMemo(() => uniq(value), [value]);

  const availableOptions = useMemo(
    () => normalizedOptions.filter((opt) => !normalizedValue.includes(opt)),
    [normalizedOptions, normalizedValue],
  );

  const [pending, setPending] = useState("");

  useEffect(() => {
    // Keep user's current pending selection when possible.
    // Only auto-pick when pending is empty/invalid or already selected.
    if (!availableOptions.length) {
      if (pending !== "") setPending("");
      return;
    }

    if (!pending || !availableOptions.includes(pending)) {
      setPending(availableOptions[0]);
    }
  }, [availableOptions, pending]);

  const addPending = () => {
    if (!pending) return;
    if (normalizedValue.includes(pending)) return;
    onChange?.(uniq([...normalizedValue, pending]));
  };

  const removeValue = (item) => {
    onChange?.(normalizedValue.filter((v) => v !== item));
  };

  return (
    <div className="clinical-multi" aria-label={label}>
      <div className="clinical-multi__row">
        <label className="clinical-form__label clinical-multi__label">
          {label}
          <select
            className="clinical-form__select"
            value={pending}
            onChange={(e) => setPending(e.target.value)}
            disabled={disabled || availableOptions.length === 0}
          >
            {availableOptions.length === 0 ? (
              <option value="" disabled>
                Todas seleccionadas
              </option>
            ) : (
              availableOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))
            )}
          </select>
        </label>

        <button
          type="button"
          className="clinical-button clinical-button--outline clinical-multi__add"
          onClick={addPending}
          disabled={disabled || !pending || availableOptions.length === 0}
        >
          Agregar
        </button>
      </div>

      {normalizedValue.length === 0 ? (
        <p className="clinical-multi__empty">{emptyText}</p>
      ) : (
        <ul
          className="clinical-multi__chips"
          aria-label={`Seleccionados: ${label}`}
        >
          {normalizedValue.map((item) => (
            <li key={item} className="clinical-multi__chip">
              <span className="clinical-multi__chip-text">{item}</span>
              <button
                type="button"
                className="clinical-multi__chip-remove"
                onClick={() => removeValue(item)}
                disabled={disabled}
                aria-label={`Quitar ${item}`}
                title="Quitar"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}

      {!disabled ? (
        <p className="clinical-hint" style={{ marginTop: "0.45rem" }}>
          Agrega una opción a la vez. Puedes quitar con “×”.
        </p>
      ) : null}
    </div>
  );
}

export default MultiSelectPicker;
