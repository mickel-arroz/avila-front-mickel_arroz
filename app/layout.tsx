import "../styles/globals.css";

export const metadata = {
  title: "Globetrotter - Mickel Arroz",
  description: "Reserva de viajes moderna y minimalista",
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
