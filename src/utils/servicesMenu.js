// Menú oficial de servicios Lotus Spa
// Fuente única de verdad para nombres y precios

export const SERVICE_CATEGORIES = [
  {
    id: "faciales",
    title: "Tratamientos faciales",
    items: [
      {
        id: "limpieza-basica",
        name: "Limpieza básica",
        duration: "35 min",
        price: "$400",
        description:
          "Lavado de rostro, extracción, mascarilla y protección solar FPS50.",
      },
      {
        id: "limpieza-profunda",
        name: "Limpieza profunda",
        duration: "60 min",
        price: "$500",
        description:
          "Se añade microdermoabrasión suave e hidratación profunda para renovar la piel.",
      },
      {
        id: "radiofrecuencia",
        name: "Radiofrecuencia",
        duration: "30 min",
        price: "$390",
        description:
          "Lavado de rostro, aparatología de radiofrecuencia, hidratación e FPS50.",
      },
      {
        id: "microdermoabrasion",
        name: "Microdermoabrasión",
        duration: "30 min",
        price: "$390",
        description:
          "Lavado de rostro, microdermoabrasión, hidratación profunda y FPS50.",
      },
      {
        id: "dermapen",
        name: "Dermapen",
        duration: "40 min",
        price: "$700",
        description:
          "Lavado de rostro, dermapen, hidratación avanzada y FPS50.",
      },
    ],
  },
  {
    id: "corporales",
    title: "Tratamientos corporales",
    items: [
      {
        id: "masaje-relajante-lotus",
        name: "Masaje relajante Lotus- Cuerpo C.",
        duration: "60 min",
        price: "$600",
        description:
          "Masaje relajante integral de cuerpo completo con aromaterapia y técnicas suaves.",
      },
      {
        id: "masaje-relajante-espalda-piernas",
        name: "Masaje relajante - Espalda y piernas",
        duration: "30 min",
        price: "$300",
        description:
          "Enfoque en espalda y piernas para liberar tensión acumulada y cansancio.",
      },
      {
        id: "masaje-piernas-cansadas",
        name: "Masaje piernas cansadas",
        duration: "30 min",
        price: "$300",
        description:
          "Masaje localizado para activar la circulación y aliviar la sensación de pesadez.",
      },
      {
        id: "drenaje-linfatico",
        name: "Drenaje linfático- Cuerpo C.",
        duration: "60 min",
        price: "$650",
        description:
          "Técnica de masaje suave para apoyar el sistema linfático y desinflamar.",
      },
      {
        id: "moldeo-reductivo",
        name: "Moldeo/Reductivo",
        duration: "50 min",
        price: "$500",
        description:
          "Masaje con maniobras especializadas para moldear la silueta y reducir medidas.",
      },
    ],
  },
  {
    id: "mixtos",
    title: "Tratamientos mixtos",
    items: [
      {
        id: "relajante-cc-hidratacion",
        name: "Masaje relajante c.c + Hidratación facial",
        duration: "60 min",
        price: "$555",
        description:
          "Masaje corporal relajante combinado con hidratación facial profunda.",
      },
      {
        id: "radiofrecuencia-masaje-hombros",
        name: "Radiofrecuencia facial + Masaje hombros y cuello",
        duration: "40 min",
        price: "$555",
        description:
          "Radiofrecuencia facial más masaje liberador en hombros y cuello.",
      },
      {
        id: "masaje-espalda-dermapen",
        name: "Masaje en espalda + Dermapen",
        duration: "50 min",
        price: "$800",
        description:
          "Masaje relajante en espalda complementado con tratamiento de dermapen facial.",
      },
      {
        id: "limpieza-profunda-electroterapia",
        name: "Limpieza profunda + Electroterapia corporal",
        duration: "60 min",
        price: "$900",
        description:
          "Limpieza facial profunda combinada con electroterapia corporal para una experiencia integral.",
      },
    ],
  },
  {
    id: "expres",
    title: "Tratamientos exprés",
    items: [
      {
        id: "electroterapia",
        name: "Electroterapia (Espalda o piernas)",
        duration: "30 min",
        price: "$190",
        description:
          "Electroterapia focalizada en espalda o piernas para aliviar tensión.",
      },
      {
        id: "hidratacion-facial-express",
        name: "Hidratación facial",
        duration: "30 min",
        price: "$190",
        description:
          "Hidratación facial exprés para devolver frescura y luminosidad.",
      },
      {
        id: "microdermoabrasion-express",
        name: "Microdermoabrasión",
        duration: "30 min",
        price: "$290",
        description: "Microdermoabrasión rápida con cierre hidratante.",
      },
      {
        id: "radiofrecuencia-express",
        name: "Radiofrecuencia",
        duration: "30 min",
        price: "$300",
        description:
          "Sesión rápida de radiofrecuencia para firmeza y tonificación.",
      },
      {
        id: "reflexologia-podal",
        name: "Reflexología podal",
        duration: "30 min",
        price: "$190",
        description:
          "Masaje de puntos reflejos en los pies para equilibrar y relajar todo el cuerpo.",
      },
    ],
  },
];

export const SERVICES_FLAT = SERVICE_CATEGORIES.flatMap((cat) =>
  cat.items.map((item) => ({
    ...item,
    categoryId: cat.id,
    categoryTitle: cat.title,
  }))
);
