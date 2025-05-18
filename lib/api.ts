// lib/api.ts
import { Flight } from "@/types";

export async function fetchFlights(): Promise<Flight[]> {
  try {
    const res = await fetch(
      "https://raw.githubusercontent.com/Lstanislao/cities-permalink/main/flights.json"
    );

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      throw new Error("Formato de datos inválido");
    }

    return data as Flight[];
  } catch (error) {
    console.error("Error en fetchFlights:", error);
    throw new Error(
      "No se pudieron cargar los vuelos. Por favor intente más tarde"
    );
  }
}
