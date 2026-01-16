import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import LandingPage from "../LandingPage/LandingPage";
import ServicesPage from "../ServicesPage/ServicesPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import ConsultationsPage from "../ConsultationsPage/ConsultationsPage";
import BookingPage from "../BookingPage/BookingPage";
import SettingsPage from "../SettingsPage/SettingsPage";
import { AuthProvider } from "../../context/AuthContext";
import ScrollToTop from "./ScrollToTop";

function App() {
  return (
    <AuthProvider>
      <Router>
        {/* Siempre que cambie la ruta, volvemos al inicio de la página */}
        <ScrollToTop />
        <Routes>
          {/* Ruta principal: siempre muestra la Landing con HeroSection */}
          <Route path="/" element={<LandingPage />} />
          {/* Página de listado completo de servicios */}
          <Route path="/products" element={<ServicesPage />} />
          {/* Área de cuenta */}
          <Route path="/perfil" element={<ProfilePage />} />
          <Route path="/mis-consultas" element={<ConsultationsPage />} />
          <Route path="/reservar" element={<BookingPage />} />
          <Route path="/nueva-reserva" element={<BookingPage />} />
          <Route path="/configuracion" element={<SettingsPage />} />
          {/* Cualquier otra ruta redirige a la HeroSection en / */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
