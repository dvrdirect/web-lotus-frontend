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

  // We keep the select in an "empty" state by default to avoid
  // the feeling of a field resetting to some arbitrary option.
  const [pending, setPending] = useState("");

  useEffect(() => {
    // If the previously selected pending value is no longer selectable,
    // reset to placeholder.
    if (pending && !availableOptions.includes(pending)) {
      setPending("");
    }
  }, [availableOptions, pending]);

  const removeValue = (item) => {
    onChange?.(normalizedValue.filter((v) => v !== item));
  };

  const addValue = (item) => {
    if (!item) return;
    if (normalizedValue.includes(item)) return;
    onChange?.(uniq([...normalizedValue, item]));
  };

  const handleSelectChange = (e) => {
    const next = e.target.value;
    // Immediately add and go back to placeholder.
    addValue(next);
    setPending("");
  };

  return (
    <div className="clinical-multi" aria-label={label}>
      <label className="clinical-form__label">
        {label}

        <div
          className={
            disabled
              ? "clinical-multi__control clinical-multi__control--disabled"
              : "clinical-multi__control"
          }
        >
          {normalizedValue.length === 0 ? (
            <p className="clinical-multi__empty" aria-live="polite">
              {emptyText}
            </p>
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

          <select
            className="clinical-multi__select"
            value={pending}
            onChange={handleSelectChange}
            disabled={disabled || availableOptions.length === 0}
            aria-label={`Agregar opción: ${label}`}
          >
            <option value="" disabled>
              {availableOptions.length === 0
                ? "Todas seleccionadas"
                : "Selecciona para agregar…"}
            </option>

            {availableOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </label>

      {!disabled ? (
        <p className="clinical-hint" style={{ marginTop: "0.45rem" }}>
          Selecciona una opción para agregarla. Puedes quitar con “×”.
        </p>
      ) : null}
    </div>
  );
}

export default MultiSelectPicker;
