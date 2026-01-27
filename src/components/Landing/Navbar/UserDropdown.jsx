import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  User,
  FileText,
  Clock3,
  CalendarPlus,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../../context/AuthContext";

const UserDropdown = () => {
  const { userData, logout, isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const userName = userData?.name || "Invitado";

  const closeMenu = () => setOpen(false);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    closeMenu();
  };

  const handleLogout = () => {
    closeMenu();
    logout();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const menuId = "user-menu";
  const currentPath = location.pathname;

  return (
    <div className="user-dropdown" ref={containerRef}>
      <button
        type="button"
        className="user-dropdown__trigger"
        onMouseEnter={() => setOpen(true)}
        onClick={handleToggle}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
      >
        <span className="user-dropdown__trigger-icon" aria-hidden="true">
          <User size={16} />
        </span>
        <span className="user-dropdown__trigger-label">{userName}</span>
        <ChevronDown
          size={16}
          className={
            open
              ? "user-dropdown__chevron user-dropdown__chevron--open"
              : "user-dropdown__chevron"
          }
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className="user-dropdown__menu" role="menu" id={menuId}>
          <button
            type="button"
            className={
              "user-dropdown__item" +
              (currentPath === "/perfil" ? " user-dropdown__item--active" : "")
            }
            role="menuitem"
            onClick={() => handleNavigate("/perfil")}
          >
            <span className="user-dropdown__item-icon" aria-hidden="true">
              <User size={16} />
            </span>
            <span className="user-dropdown__item-label">Mi Perfil</span>
          </button>

          <button
            type="button"
            className={
              "user-dropdown__item" +
              (currentPath === "/mis-consultas"
                ? " user-dropdown__item--active"
                : "")
            }
            role="menuitem"
            onClick={() => handleNavigate("/mis-consultas")}
          >
            <span className="user-dropdown__item-icon" aria-hidden="true">
              <Clock3 size={16} />
            </span>
            <span className="user-dropdown__item-label">Mis Consultas</span>
          </button>

          {isLoggedIn && (
            <button
              type="button"
              className={
                "user-dropdown__item" +
                (currentPath === "/historial-clinico"
                  ? " user-dropdown__item--active"
                  : "")
              }
              role="menuitem"
              onClick={() => handleNavigate("/historial-clinico")}
            >
              <span className="user-dropdown__item-icon" aria-hidden="true">
                <FileText size={16} />
              </span>
              <span className="user-dropdown__item-label">
                Historial Clínico
              </span>
            </button>
          )}

          <button
            type="button"
            className={
              "user-dropdown__item user-dropdown__item--primary" +
              (currentPath === "/reservar"
                ? " user-dropdown__item--active"
                : "")
            }
            role="menuitem"
            onClick={() => handleNavigate("/reservar")}
          >
            <span className="user-dropdown__item-icon" aria-hidden="true">
              <CalendarPlus size={16} />
            </span>
            <span className="user-dropdown__item-label">Nueva Reserva</span>
          </button>

          <button
            type="button"
            className={
              "user-dropdown__item" +
              (currentPath === "/configuracion"
                ? " user-dropdown__item--active"
                : "")
            }
            role="menuitem"
            onClick={() => handleNavigate("/configuracion")}
          >
            <span className="user-dropdown__item-icon" aria-hidden="true">
              <Settings size={16} />
            </span>
            <span className="user-dropdown__item-label">Configuración</span>
          </button>

          <div className="user-dropdown__separator" aria-hidden="true" />

          <button
            type="button"
            className="user-dropdown__item user-dropdown__item--danger"
            role="menuitem"
            onClick={handleLogout}
          >
            <span className="user-dropdown__item-icon" aria-hidden="true">
              <LogOut size={16} />
            </span>
            <span className="user-dropdown__item-label">Cerrar sesión</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
