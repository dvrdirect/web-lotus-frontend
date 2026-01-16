import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Landing/Navbar/Navbar";
import Footer from "../Landing/Footer/Footer";
import SocialFloatingBar from "../Landing/SocialFloatingBar/SocialFloatingBar";
import { ArrowLeft } from "lucide-react";
import { SERVICE_CATEGORIES } from "../../utils/servicesMenu";
import "./ServicesPage.css";

function ServicesPage() {
  return (
    <div className="services-page">
      <Navbar />
      <SocialFloatingBar />
      <main className="services-page__main">
        <header className="services-page__hero">
          <span className="services-page__eyebrow">Menú de servicios</span>
          <h1 className="services-page__title">Lotus Spa</h1>
          <p className="services-page__subtitle">
            Explora cada uno de nuestros tratamientos diseñados para armonizar
            cuerpo, mente y espíritu, con el mismo cuidado y detalle que en
            nuestra cabina.
          </p>
        </header>

        <section
          className="services-list"
          aria-label="Listado de servicios Lotus Spa"
        >
          {SERVICE_CATEGORIES.map((category) => (
            <article
              key={category.id}
              className="services-list__category"
              id={category.id}
            >
              <h2 className="services-list__title">{category.title}</h2>
              <div className="services-list__items">
                {category.items.map((item, index) => (
                  <div className="service-item" key={index}>
                    <div className="service-item__header">
                      <h3 className="service-item__name">{item.name}</h3>
                      <span className="service-item__duration">
                        {item.duration}
                      </span>
                    </div>
                    <p className="service-item__description">
                      {item.description}
                    </p>
                    <div className="service-item__footer">
                      <span className="service-item__price-label">
                        Inversión
                      </span>
                      <span className="service-item__price">{item.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>
      </main>

      <Footer />

      <Link
        to="/"
        className="services-page__fab"
        aria-label="Regresar a la página principal"
      >
        <ArrowLeft size={20} />
      </Link>
    </div>
  );
}

export default ServicesPage;
