import React, { useMemo, useRef, useState } from "react";
import {
  findAdminUser,
  addPastAppointment,
  getAdminReservations,
  deleteAdminReservation,
} from "../../api/adminApi";
import "./AdminAppointments.css";

const ADMIN_EMAIL = "dvrdirect@gmail.com";

const AdminAppointments = ({ user }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchMode, setSearchMode] = useState("email");
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [client, setClient] = useState(null);
  const [clientReservations, setClientReservations] = useState([]);
  const [searchError, setSearchError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    date: "",
    service: "",
    notes: "",
  });

  const detailsRef = useRef(null);

  const isAdmin = useMemo(
    () => user?.email && user.email.toLowerCase() === ADMIN_EMAIL,
    [user],
  );

  if (!isAdmin) return null;

  const handleSearch = async (event) => {
    event.preventDefault();
    setSearchError("");
    setSuccessMessage("");
    setClient(null);

    if (!searchValue.trim()) {
      setSearchError("Ingresa un email o ID válido.");
      return;
    }

    setIsSearching(true);
    try {
      const payload =
        searchMode === "email"
          ? { email: searchValue.trim() }
          : { id: searchValue.trim() };
      const result = await findAdminUser(payload);
      setClient(result.user);
      // fetch reservations from admin API
      try {
        const res = await getAdminReservations(result.user.id);
        setClientReservations(res.reservations || []);
      } catch (e) {
        setClientReservations([]);
      }
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } catch (error) {
      if (error.status === 403) {
        setSearchError("No autorizado.");
      } else if (error.status === 404) {
        setSearchError("Cliente no encontrado.");
      } else {
        setSearchError("No se pudo buscar el cliente.");
      }
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    if (!client) return;
    const ok = window.confirm(
      "¿Seguro que deseas eliminar esta reserva? Esta acción no se puede deshacer.",
    );
    if (!ok) return;

    try {
      const result = await deleteAdminReservation(reservationId);
      // remove from local state
      setClientReservations((prev) =>
        prev.filter((r) => r._id !== reservationId),
      );
      // update client counts/history if backend returned them
      if (result.data) {
        setClient((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            appointmentsCount:
              result.data.appointmentsCount ?? prev.appointmentsCount,
            appointmentsHistory:
              result.data.appointmentsHistory ?? prev.appointmentsHistory,
          };
        });
      }
    } catch (error) {
      alert("No se pudo eliminar la reserva.");
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSaveError("");
    setSuccessMessage("");

    if (!client?.id) {
      setSaveError("Selecciona un cliente antes de guardar.");
      return;
    }

    if (!form.date || !form.service.trim()) {
      setSaveError("Fecha y servicio son obligatorios.");
      return;
    }

    setIsSaving(true);
    try {
      const result = await addPastAppointment({
        userId: client.id,
        date: form.date,
        service: form.service.trim(),
        notes: form.notes.trim(),
      });

      setSuccessMessage("Cita agregada correctamente.");
      setClient((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          appointmentsCount:
            result.data?.appointmentsCount ?? prev.appointmentsCount,
          appointmentsHistory:
            result.data?.appointmentsHistory ?? prev.appointmentsHistory,
        };
      });
      setForm({ date: "", service: "", notes: "" });
      // refresh reservations list
      try {
        const res = await getAdminReservations(client.id);
        setClientReservations(res.reservations || []);
      } catch (e) {
        // ignore
      }
    } catch (error) {
      if (error.status === 403) {
        setSaveError("No autorizado.");
      } else if (error.status === 404) {
        setSaveError("Cliente no encontrado.");
      } else {
        setSaveError("No se pudo agregar la cita.");
      }
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="admin-appointments" aria-label="Panel de citas admin">
      <div className="admin-appointments__container">
        <header className="admin-appointments__header">
          <span className="admin-appointments__eyebrow">Panel Admin</span>
          <h2 className="admin-appointments__title">Registrar citas pasadas</h2>
          <p className="admin-appointments__subtitle">
            Encuentra a la clienta y registra manualmente sus experiencias
            anteriores con un toque elegante.
          </p>
        </header>

        <div className="admin-appointments__grid">
          <article className="admin-appointments__card">
            <h3 className="admin-appointments__card-title">Buscar cliente</h3>
            <form className="admin-appointments__form" onSubmit={handleSearch}>
              <div className="admin-appointments__toggle">
                <button
                  type="button"
                  className={
                    "admin-appointments__toggle-button" +
                    (searchMode === "email"
                      ? " admin-appointments__toggle-button--active"
                      : "")
                  }
                  onClick={() => setSearchMode("email")}
                >
                  Buscar por email
                </button>
                <button
                  type="button"
                  className={
                    "admin-appointments__toggle-button" +
                    (searchMode === "id"
                      ? " admin-appointments__toggle-button--active"
                      : "")
                  }
                  onClick={() => setSearchMode("id")}
                >
                  Buscar por ID
                </button>
              </div>

              <label
                className="admin-appointments__label"
                htmlFor="client-search"
              >
                {searchMode === "email"
                  ? "Email del cliente"
                  : "ID del usuario"}
              </label>
              <input
                id="client-search"
                type="text"
                className="admin-appointments__input"
                placeholder={
                  searchMode === "email"
                    ? "cliente@correo.com"
                    : "656f2c9a8f..."
                }
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
              />

              {searchError && (
                <p className="admin-appointments__message admin-appointments__message--error">
                  {searchError}
                </p>
              )}

              <button
                type="submit"
                className="admin-appointments__button"
                disabled={isSearching}
              >
                {isSearching ? "Buscando..." : "Buscar cliente"}
              </button>
            </form>
          </article>

          <article className="admin-appointments__card" ref={detailsRef}>
            <h3 className="admin-appointments__card-title">
              Información del cliente
            </h3>
            {client ? (
              <div className="admin-appointments__client">
                <div>
                  <p className="admin-appointments__client-name">
                    {client.name}
                  </p>
                  <p className="admin-appointments__client-email">
                    {client.email}
                  </p>
                </div>
                <div className="admin-appointments__client-count">
                  <span>Citas registradas</span>
                  <strong>{client.appointmentsCount ?? 0}</strong>
                </div>
              </div>
            ) : (
              <p className="admin-appointments__empty">
                Busca una clienta para ver sus datos.
              </p>
            )}
            {client && (
              <div className="admin-appointments__reservations">
                <h4 className="admin-appointments__subhead">Reservas</h4>
                {clientReservations.length === 0 ? (
                  <p className="admin-appointments__empty">Sin reservas</p>
                ) : (
                  <ul className="admin-appointments__list">
                    {clientReservations.map((r) => (
                      <li key={r._id} className="admin-appointments__row">
                        <div className="admin-appointments__row-info">
                          <span className="admin-appointments__service">
                            {r.serviceName}
                          </span>
                          <span className="admin-appointments__date">
                            {new Date(r.scheduledAt).toLocaleDateString()}
                          </span>
                          <span className="admin-appointments__status">
                            {r.status}
                          </span>
                        </div>
                        <button
                          type="button"
                          className="admin-appointments__delete"
                          onClick={() => handleDeleteReservation(r._id)}
                        >
                          ❌ Eliminar
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </article>
        </div>

        <article className="admin-appointments__card admin-appointments__card--wide">
          <h3 className="admin-appointments__card-title">
            Agregar cita pasada
          </h3>
          <form className="admin-appointments__form" onSubmit={handleSubmit}>
            <div className="admin-appointments__field">
              <label
                className="admin-appointments__label"
                htmlFor="appointment-date"
              >
                Fecha
              </label>
              <input
                id="appointment-date"
                type="date"
                className="admin-appointments__input"
                value={form.date}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, date: event.target.value }))
                }
              />
            </div>

            <div className="admin-appointments__field">
              <label
                className="admin-appointments__label"
                htmlFor="appointment-service"
              >
                Servicio
              </label>
              <input
                id="appointment-service"
                type="text"
                className="admin-appointments__input"
                placeholder="Masaje relajante"
                value={form.service}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, service: event.target.value }))
                }
              />
            </div>

            <div className="admin-appointments__field">
              <label
                className="admin-appointments__label"
                htmlFor="appointment-notes"
              >
                Notas
              </label>
              <textarea
                id="appointment-notes"
                className="admin-appointments__textarea"
                placeholder="Notas adicionales"
                value={form.notes}
                onChange={(event) =>
                  setForm((prev) => ({ ...prev, notes: event.target.value }))
                }
                rows={4}
              />
            </div>

            {saveError && (
              <p className="admin-appointments__message admin-appointments__message--error">
                {saveError}
              </p>
            )}
            {successMessage && (
              <p className="admin-appointments__message admin-appointments__message--success">
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              className="admin-appointments__button admin-appointments__button--primary"
              disabled={isSaving}
            >
              {isSaving ? "Guardando..." : "Agregar cita"}
            </button>
          </form>
        </article>
      </div>
    </section>
  );
};

export default AdminAppointments;
