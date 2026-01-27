import React from "react";
import { Helmet } from "react-helmet";

const SpaLotusSEO = ({
  url = "https://www.spalotus.mx/",
  image = "https://www.spalotus.mx/assets/og.jpg",
  lat = "19.000000",
  lon = "-99.000000",
  phone = "+52 55 0000 0000",
  streetAddress = "Nicolás Bravo, Estado de México",
}) => {
  const title =
    "Spa Lotus | Masajes relajantes y rituales de bienestar en Estado de México";
  const description =
    "Spa Lotus en Nicolás Bravo, Estado de México. Masajes relajantes, faciales y ritual de té para bienestar integral.";
  const keywords =
    "spa Estado de México, masajes relajantes CDMX, faciales, ritual de té, Nicolás Bravo";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DaySpa",
    name: "Spa Lotus",
    description,
    url,
    telephone: phone,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality: "Nicolás Bravo",
      addressRegion: "Estado de México",
      addressCountry: "MX",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: lat,
      longitude: lon,
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Spa Lotus" />
      <meta property="og:locale" content="es_MX" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Geo tags */}
      <meta name="geo.region" content="MX-EM" />
      <meta name="geo.placename" content="Nicolás Bravo, Estado de México" />
      <meta name="geo.position" content={`${lat};${lon}`} />
      <meta name="ICBM" content={`${lat}, ${lon}`} />

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};

export default SpaLotusSEO;
