import React, { useEffect, useMemo, useState } from "react";

const uniq = (list) => Array.from(new Set((list || []).filter(Boolean)));

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

  const [pending, setPending] = useState("");

  useEffect(() => {
    const firstAvailable = normalizedOptions.find(
      (opt) => !normalizedValue.includes(opt),
    );
    setPending(firstAvailable || normalizedOptions[0] || "");
  }, [normalizedOptions, normalizedValue]);

  const addPending = () => {
    if (!pending) return;
    if (normalizedValue.includes(pending)) return;
    onChange?.([...normalizedValue, pending]);
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
            disabled={disabled}
          >
            {normalizedOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </label>

        <button
          type="button"
          className="clinical-button clinical-button--outline clinical-multi__add"
          onClick={addPending}
          disabled={disabled || !pending}
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
