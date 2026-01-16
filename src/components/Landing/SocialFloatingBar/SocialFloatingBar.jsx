import React, { useState } from "react";
import "./SocialFloatingBar.css";
import { Facebook, Instagram, MessageCircle, Share2 } from "lucide-react";

const SocialFloatingBar = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      className="social-floating-bar"
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
    >
      <div
        className={`social-floating-bar__container${
          expanded ? " social-floating-bar__container--expanded" : ""
        }`}
      >
        <button
          type="button"
          className="social-floating-bar__trigger"
          aria-label="Abrir redes sociales de Lotus Spa & Tea"
        >
          <span className="social-floating-bar__trigger-icon">
            <Share2 size={18} />
          </span>
        </button>

        <div className="social-floating-bar__icons">
          <a
            href="https://wa.me/5215571089120"
            target="_blank"
            rel="noopener noreferrer"
            className="social-floating-bar__icon social-floating-bar__icon--whatsapp"
            aria-label="Chatear por WhatsApp"
          >
            <MessageCircle size={18} />
          </a>
          <a
            href="https://www.facebook.com/LotusSpa.Tea"
            target="_blank"
            rel="noopener noreferrer"
            className="social-floating-bar__icon social-floating-bar__icon--facebook"
            aria-label="Visitar Facebook de Lotus Spa & Tea"
          >
            <Facebook size={18} />
          </a>
          <a
            href="https://www.instagram.com/lotus_spa_and_tea"
            target="_blank"
            rel="noopener noreferrer"
            className="social-floating-bar__icon social-floating-bar__icon--instagram"
            aria-label="Visitar Instagram de Lotus Spa & Tea"
          >
            <Instagram size={18} />
          </a>
        </div>
      </div>
    </aside>
  );
};

export default SocialFloatingBar;
