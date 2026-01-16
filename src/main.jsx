import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

// TODO: reemplaza esta constante con tu CLIENT_ID real de Google
const GOOGLE_CLIENT_ID =
  "66183913605-dnb9h8p5hb41knidgdkqs09ujq0aci4o.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
