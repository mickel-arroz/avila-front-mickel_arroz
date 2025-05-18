// app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Globetrotter - Mickel Arroz",
  description: "Reserva de viajes moderna y minimalista",
  openGraph: {
    title: "Globetrotter ✈️ - Reserva tu viaje",
    description:
      "Aplicación de reservas de viajes moderna y minimalista. Reserva vuelos, gestiona viajeros y servicios adicionales con facilidad.",
    url: "https://avila-front-mickel-arroz.vercel.app",
    siteName: "Globetrotter",
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/public/presentacionGlobetrotter.png",
        width: 1200,
        height: 630,
        alt: "Globetrotter – Reserva de viajes moderna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Globetrotter ✈️ - Reserva tu viaje",
    description:
      "Una experiencia moderna, responsive y multistep para reservar tus viajes. Proyecto de prueba técnica por Mickel Arroz.",
    images: ["/public/presentacionGlobetrotter.png"],
    creator: "@mickelarroz",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
