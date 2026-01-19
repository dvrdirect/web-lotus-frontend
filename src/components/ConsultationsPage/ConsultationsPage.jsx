import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Clock3, CalendarDays } from "lucide-react";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import { SERVICES_FLAT } from "../../utils/servicesMenu";
import { getReservations } from "../../api/reservationsApi";
import "./ConsultationsPage.css";

function ConsultationsPage() {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Ejemplo estático de historial: mezcla de citas pasadas y próximas
  const sampleHistory = [
    {
      id: 1,
      serviceId: "limpieza-profunda",
      date: "2026-01-10",
      time: "12:00",
      status: "Finalizada",
    },
    {
      id: 2,
      serviceId: "masaje-relajante-lotus",
      date: "2026-01-20",
      time: "17:30",
      status: "Confirmada",
    },
    {
      id: 3,
      serviceId: "reflexologia-podal",
      date: "2026-01-28",
      time: "11:00",
      status: "Confirmada",
    },
  ].map((item) => {
    const service = SERVICES_FLAT.find((s) => s.id === item.serviceId);
    return {
      ...item,
      serviceName: service?.name || "Tratamiento Lotus Spa",
      categoryTitle: service?.categoryTitle || "",
    };
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const data = await getReservations();
        if (!isMounted) return;

        const mapped = (data || []).map((item) => {
          const dateObj = item.scheduledAt ? new Date(item.scheduledAt) : null;
          const date = dateObj ? dateObj.toISOString().slice(0, 10) : "";
          const time = dateObj ? dateObj.toTimeString().slice(0, 5) : "";

          return {
            id: item._id,
            serviceName: item.serviceName || "Tratamiento Lotus Spa",
            categoryTitle: "",
            date,
            time,
            status: "Confirmada",
          };
        });

        setReservations(mapped);
        setLoadError("");
      } catch (error) {
        console.error("Error al cargar reservas", error);
        setLoadError(
          error?.message || "No se pudo cargar tu historial de consultas.",
        );
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const appointmentsToShow =
    reservations.length > 0 ? reservations : sampleHistory;

  return (
    <div className="account-page">
      <Navbar />
      <SocialFloatingBar />
      <main className="account-page__main">
        <header className="account-page__hero">
          <span className="account-page__eyebrow">Historial</span>
          <h1 className="account-page__title">Mis Consultas</h1>
          <p className="account-page__subtitle">
            Aquí podrás revisar tus citas pasadas, seguir recomendaciones y
            planear tus próximas experiencias de bienestar.
          </p>
        </header>

        <section
          className="account-page__card consultations-list"
          aria-label="Historial de consultas"
        >
          <div className="account-page__card-header">
            <h2 className="account-page__card-title">
              Tu historial en Lotus Spa
            </h2>
            <p className="account-page__card-caption">
              Revisa con tranquilidad tus citas recientes y próximas. Esta
              información es solo para ti.
            </p>
          </div>

          {loadError && (
            <p className="consultations-list__feedback consultations-list__feedback--error">
              {loadError}
            </p>
          )}

          {isLoading && !loadError && (
            <p className="consultations-list__feedback">
              Cargando tu historial de consultas...
            </p>
          )}

          {!isLoading && appointmentsToShow.length === 0 && !loadError && (
            <p className="consultations-list__feedback">
              Aún no tienes consultas registradas.
            </p>
          )}

          <ul className="consultations-list__items">
            {appointmentsToShow.map((appointment) => (
              <li key={appointment.id} className="consultation-card">
                <div className="consultation-card__header">
                  <div className="consultation-card__title-block">
                    <p className="consultation-card__service">
                      {appointment.serviceName}
                    </p>
                    {appointment.categoryTitle && (
                      <p className="consultation-card__category">
                        {appointment.categoryTitle}
                      </p>
                    )}
                  </div>
                  <span
                    className={
                      "consultation-card__status consultation-card__status--" +
                      appointment.status.toLowerCase()
                    }
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="consultation-card__meta">
                  <span className="consultation-card__meta-item">
                    <CalendarDays size={14} />
                    {appointment.date}
                  </span>
                  <span className="consultation-card__meta-item">
                    <Clock3 size={14} />
                    {appointment.time} hrs
                  </span>
                </div>
              </li>
            ))}
          </ul>
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

export default ConsultationsPage;
