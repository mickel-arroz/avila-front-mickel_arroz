import { Flight } from "@/types";

// lib/api.ts
export async function fetchFlights(): Promise<Flight[]> {
  const res = await fetch(
    "https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json"
  );
  if (!res.ok) throw new Error("Error al obtener vuelos");
  return res.json();
}
