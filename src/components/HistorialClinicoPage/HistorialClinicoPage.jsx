import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import HistorialClinicoUser from "./HistorialClinicoUser";
import HistorialClinicoStaff from "./HistorialClinicoStaff";
import {
  getClientClinicalHistory,
  getMyClinicalHistory,
  saveClientClinicalHistory,
  saveMyClinicalHistory,
} from "../../api/clinicalHistoryApi";
import { useAuth } from "../../context/AuthContext";
import { getUserRole } from "../../utils/roles";
import "./HistorialClinicoPage.css";

function HistorialClinicoPage() {
  const { userData } = useAuth();
  const role = useMemo(() => getUserRole(userData), [userData]);
  const params = useParams();

  const isStaffView = Boolean(params?.id);
  const clientId = params?.id;

  const [data, setData] = useState(null);

  useEffect(() => {
    if (isStaffView) {
      setData(getClientClinicalHistory({ id: clientId }));
      return;
    }

    setData(
      getMyClinicalHistory({
        name: userData?.name || "",
        email: userData?.email || "",
      }),
    );
  }, [isStaffView, clientId, userData?.email, userData?.name]);

  const handleSave = (next) => {
    if (isStaffView) {
      const saved = saveClientClinicalHistory({ id: clientId }, next);
      setData(saved);
      return;
    }

    const saved = saveMyClinicalHistory({ email: userData?.email }, next);
    setData(saved);
  };

  const staffAccessDenied = isStaffView && role !== "admin";

  return (
    <div className="account-page">
      <Navbar />
      <SocialFloatingBar />

      <main className="account-page__main">
        <header className="account-page__hero">
          <span className="account-page__eyebrow">Salud & Bienestar</span>
          <h1 className="account-page__title">Historial Clínico</h1>
          <p className="account-page__subtitle">
            {isStaffView
              ? "Vista staff: seguimiento clínico y notas internas."
              : "Un espacio privado para centralizar tu información y seguimiento."}
          </p>
        </header>

        {staffAccessDenied ? (
          <section className="account-page__card" aria-label="Acceso denegado">
            <div className="account-page__card-header">
              <h2 className="account-page__card-title">Acceso denegado</h2>
              <p className="account-page__card-caption">
                No tienes permisos para ver el historial clínico de una clienta.
              </p>
            </div>
          </section>
        ) : null}

        {!staffAccessDenied && data ? (
          isStaffView ? (
            <section className="account-page__card" aria-label="Vista staff">
              <div className="account-page__card-header">
                <h2 className="account-page__card-title">Expediente</h2>
                <p className="account-page__card-caption">
                  Edición clínica disponible para staff.
                </p>
              </div>

              <HistorialClinicoStaff
                data={data}
                onSave={handleSave}
                clientId={clientId}
              />
            </section>
          ) : (
            <section className="account-page__card" aria-label="Vista clienta">
              <div className="account-page__card-header">
                <h2 className="account-page__card-title">Mi historial</h2>
                <p className="account-page__card-caption">
                  Edita tus preferencias y alergias. El resto lo gestiona el
                  staff.
                </p>
              </div>

              <HistorialClinicoUser data={data} onSave={handleSave} />
            </section>
          )
        ) : !staffAccessDenied ? (
          <section className="account-page__card" aria-label="Cargando">
            <p className="account-page__placeholder-text">Cargando...</p>
          </section>
        ) : null}
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

export default HistorialClinicoPage;
