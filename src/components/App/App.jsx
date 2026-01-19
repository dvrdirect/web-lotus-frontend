import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LandingPage from "../LandingPage/LandingPage";
import ServicesPage from "../ServicesPage/ServicesPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import ConsultationsPage from "../ConsultationsPage/ConsultationsPage";
import BookingPage from "../BookingPage/BookingPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { AuthProvider } from "../../context/AuthContext";
import ScrollToTop from "./ScrollToTop";
import { withProtectedRoute } from "../ProtectedRoute";

const ProfilePageProtected = withProtectedRoute(ProfilePage);
const ConsultationsPageProtected = withProtectedRoute(ConsultationsPage);
const BookingPageProtected = withProtectedRoute(BookingPage);
const SettingsPageProtected = withProtectedRoute(SettingsPage);

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Siempre que cambie la ruta, volvemos al inicio de la página */}
        <ScrollToTop />
        <Routes>
          {/* Ruta principal: siempre muestra la Landing con HeroSection */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Página de listado completo de servicios */}
          <Route path="/products" element={<ServicesPage />} />
          {/* Área de cuenta */}
          <Route path="/perfil" element={<ProfilePageProtected />} />
          <Route
            path="/mis-consultas"
            element={<ConsultationsPageProtected />}
          />
          <Route path="/reservar" element={<BookingPageProtected />} />
          <Route path="/nueva-reserva" element={<BookingPageProtected />} />
          <Route path="/configuracion" element={<SettingsPageProtected />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
