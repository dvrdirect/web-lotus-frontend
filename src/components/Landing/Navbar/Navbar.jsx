import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../../../images/logos/transparent_logo.png";
import LoginModal from "../../Modals/LoginModal";
import SignupModal from "../../Modals/SignupModal";
import { useAuth } from "../../../context/AuthContext";
import UserDropdown from "./UserDropdown";
import NavReserveAction from "./NavReserveAction";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { isLoggedIn, userData, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const handleOpenSignup = () => {
      setShowSignup(true);
    };

    window.addEventListener("lotus:open-signup", handleOpenSignup);
    return () => {
      window.removeEventListener("lotus:open-signup", handleOpenSignup);
    };
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <nav className="navbar">
      <div className="navbar__container">
        <button
          type="button"
          className="navbar__brand"
          onClick={handleLogoClick}
          aria-label="Ir a la sección principal"
        >
          <img src={logo} alt="Logo" className="navbar__logo" />
        </button>
        <ul className="navbar__links">
          <li>
            <a
              href="#productos"
              className="navbar__link navbar__link--products"
            >
              Productos
            </a>
          </li>
          <li>
            <a
              href="#promociones"
              className="navbar__link navbar__link--promotions"
            >
              Promociones
            </a>
          </li>
          <li>
            <a href="#contacto" className="navbar__link navbar__link--contact">
              Contacto
            </a>
          </li>
        </ul>
        <div className="navbar__actions">
          {isLoggedIn ? (
            <>
              <UserDropdown />
              <NavReserveAction />
            </>
          ) : (
            <>
              <button
                className="navbar__login-link"
                type="button"
                onClick={() => setShowLogin(true)}
              >
                Entrar
              </button>
              <button
                className="navbar__register-btn"
                type="button"
                onClick={() => setShowSignup(true)}
              >
                Registrarse
              </button>
              <NavReserveAction />
            </>
          )}
        </div>
        <LoginModal
          open={showLogin}
          onClose={() => setShowLogin(false)}
          onSwitchToSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
        <SignupModal
          open={showSignup}
          onClose={() => setShowSignup(false)}
          onSwitchToLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      </div>
    </nav>
  );
};

export default Navbar;
