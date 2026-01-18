import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, Clock3 } from "lucide-react";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import { SERVICE_CATEGORIES } from "../../utils/servicesMenu";
import { createReservation } from "../../api/reservationsApi";
import "./BookingPage.css";

function BookingPage() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("faciales");
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  const selectedCategory = useMemo(
    () =>
      SERVICE_CATEGORIES.find(
        (category) => category.id === selectedCategoryId,
      ) || SERVICE_CATEGORIES[0],
    [selectedCategoryId],
  );

  const selectedService = useMemo(
    () =>
      selectedCategory.items.find((item) => item.id === selectedServiceId) ||
      null,
    [selectedCategory, selectedServiceId],
  );

  const canConfirm = selectedService && selectedDate && selectedTime;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!canConfirm) return;

    setSubmitError("");
    setSubmitSuccess("");
    setIsSubmitting(true);

    try {
      const scheduledAt = new Date(`${selectedDate}T${selectedTime}:00`);

      await createReservation({
        // Guardamos el nombre del servicio tal como lo ve el usuario
        serviceName: selectedService.name,
        scheduledAt,
        notes: null,
      });

      setSubmitSuccess("Tu reserva se ha creado correctamente.");
      // Opcional: limpiar selección tras reservar
      // setSelectedServiceId(null);
      // setSelectedDate("");
      // setSelectedTime("");
    } catch (error) {
      console.error("Error al crear la reserva", error);
      setSubmitError(
        error?.message ||
          "No se pudo crear la reserva. Inténtalo de nuevo más tarde.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="account-page">
      <Navbar />
      <SocialFloatingBar />
      <main className="account-page__main">
        <header className="account-page__hero">
          <span className="account-page__eyebrow">Nueva cita</span>
          <h1 className="account-page__title">Nueva Reserva</h1>
          <p className="account-page__subtitle">
            Diseña tu próxima experiencia en Lotus Spa eligiendo la categoría,
            el tratamiento y el horario que mejor se adapten a tu ritmo.
          </p>
        </header>

        <section
          className="account-page__card booking-flow"
          aria-label="Flujo de reserva"
        >
          <div className="account-page__card-header">
            <h2 className="account-page__card-title">Elige tu experiencia</h2>
            <p className="account-page__card-caption">
              Selecciona una categoría y un tratamiento del menú oficial de
              Lotus Spa. Después elige fecha y horario.
            </p>
          </div>

          <div className="booking-flow__categories" aria-label="Categorías">
            {SERVICE_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
                className={
                  "booking-flow__category-pill" +
                  (category.id === selectedCategoryId
                    ? " booking-flow__category-pill--active"
                    : "")
                }
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  setSelectedServiceId(null);
                }}
              >
                {category.title.replace("Tratamientos ", "")}
              </button>
            ))}
          </div>

          <div className="booking-flow__body">
            <div className="booking-flow__services" aria-label="Servicios">
              <h3 className="booking-flow__section-title">Tratamientos</h3>
              <ul className="booking-flow__services-list">
                {selectedCategory.items.map((service) => (
                  <li key={service.id}>
                    <button
                      type="button"
                      className={
                        "booking-flow__service-card" +
                        (selectedService && selectedService.id === service.id
                          ? " booking-flow__service-card--active"
                          : "")
                      }
                      onClick={() => setSelectedServiceId(service.id)}
                    >
                      <div className="booking-flow__service-main">
                        <p className="booking-flow__service-name">
                          {service.name}
                        </p>
                        <span className="booking-flow__service-duration">
                          {service.duration}
                        </span>
                      </div>
                      <p className="booking-flow__service-price">
                        {service.price}
                      </p>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <form
              className="booking-flow__schedule"
              onSubmit={handleSubmit}
              aria-label="Selección de fecha y hora"
            >
              <h3 className="booking-flow__section-title">Agenda tu cita</h3>

              <div className="booking-flow__field-group">
                <label className="booking-flow__label" htmlFor="booking-date">
                  Fecha
                </label>
                <div className="booking-flow__input-wrapper">
                  <CalendarDays size={16} />
                  <input
                    id="booking-date"
                    type="date"
                    className="booking-flow__input"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
              </div>

              <div className="booking-flow__field-group">
                <label className="booking-flow__label" htmlFor="booking-time">
                  Hora
                </label>
                <div className="booking-flow__input-wrapper">
                  <Clock3 size={16} />
                  <input
                    id="booking-time"
                    type="time"
                    className="booking-flow__input"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>

              {selectedService && (
                <p className="booking-flow__summary">
                  Estás reservando: <strong>{selectedService.name}</strong> ·{" "}
                  {selectedService.duration} · {selectedService.price}
                </p>
              )}

              {submitError && (
                <p className="booking-flow__feedback booking-flow__feedback--error">
                  {submitError}
                </p>
              )}
              {submitSuccess && (
                <p className="booking-flow__feedback booking-flow__feedback--success">
                  {submitSuccess}
                </p>
              )}

              <button
                type="submit"
                className="booking-flow__cta"
                disabled={!canConfirm || isSubmitting}
              >
                {isSubmitting ? "Guardando..." : "Confirmar Cita"}
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />

      <Link
        to="/"
        className="account-page__fab"
        aria-label="Regresar a la página principal"
      >
        <ArrowLeft size={20} />
      </Link>
    </div>
  );
}

export default BookingPage;
