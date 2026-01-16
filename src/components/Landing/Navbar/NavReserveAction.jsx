import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, CalendarDays, MessageCircle } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const NavReserveAction = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { isLoggedIn, userData } = useAuth();

  const displayName =
    userData?.name && userData.name.trim().length > 0
      ? userData.name.trim()
      : null;

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  const close = () => setOpen(false);

  const handleReserveWeb = () => {
    navigate("/nueva-reserva");
    close();
  };

  const buildWhatsappUrl = () => {
    const baseUrl = "https://wa.me/5215571089120?text=";
    const message =
      isLoggedIn && displayName
        ? `Hola Lotus Spa, soy ${displayName}, me gustaría agendar una cita de bienestar.`
        : "Hola Lotus Spa, me gustaría recibir información para agendar una cita de bienestar.";

    return baseUrl + encodeURIComponent(message);
  };

  const whatsappUrl = buildWhatsappUrl();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleKey = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const menuId = "nav-reserve-menu";

  return (
    <div className="nav-action" ref={containerRef}>
      <button
        type="button"
        className="nav-action__trigger"
        onMouseEnter={() => setOpen(true)}
        onClick={toggleOpen}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label="Agendar Cita"
        title="Agendar Cita"
      >
        <span className="nav-action__icon-wrap">
          <Plus size={18} className="nav-action__icon" />
        </span>
      </button>

      {open && (
        <div className="nav-action__dropdown" role="menu" id={menuId}>
          <button
            type="button"
            className="nav-action__item"
            role="menuitem"
            onClick={handleReserveWeb}
          >
            <span className="nav-action__item-icon" aria-hidden="true">
              <CalendarDays size={16} />
            </span>
            <span className="nav-action__item-label">Reservar por Web</span>
          </button>

          <div className="nav-action__separator" aria-hidden="true" />

          <a
            href={whatsappUrl}
            className="nav-action__item nav-action__item--external"
            role="menuitem"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <span className="nav-action__item-icon" aria-hidden="true">
              <MessageCircle size={16} />
            </span>
            <span className="nav-action__item-label">
              Reservar por WhatsApp
            </span>
          </a>
        </div>
      )}
    </div>
  );
};

export default NavReserveAction;
