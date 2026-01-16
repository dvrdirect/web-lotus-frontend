import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Fuerza que la aplicación siempre arranque en la parte superior
 * cuando cambia la ruta o se recarga la página.
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Uso de behavior: "auto" para que el cambio sea instantáneo, sin animación
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
