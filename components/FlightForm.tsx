"use client";

import { useEffect, useState } from "react";
import { fetchFlights } from "@/lib/api";
import type { Flight } from "@/types";

export default function FlightForm() {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [flightClass, setFlightClass] = useState("");

  useEffect(() => {
    fetchFlights().then(setFlights).catch(console.error);
  }, []);

  const uniqueDestinations = [...new Set(flights.map((f) => f.destination))];
  const uniqueClasses = [...new Set(flights.map((f) => f.class))];

  const inputClass =
    "w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

  return (
    <form className="space-y-6 max-w-xl mx-auto p-4">
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Destino
        </label>
        <input
          type="text"
          list="destinos"
          className={inputClass}
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Escribe o selecciona un destino"
        />
        <datalist id="destinos">
          {uniqueDestinations.map((dest, i) => (
            <option
              key={i}
              value={dest}
            />
          ))}
        </datalist>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Fecha de salida
        </label>
        <input
          type="date"
          className={inputClass}
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Fecha de regreso
        </label>
        <input
          type="date"
          className={inputClass}
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Clase de vuelo
        </label>
        <select
          className={inputClass}
          value={flightClass}
          onChange={(e) => setFlightClass(e.target.value)}
        >
          <option value="">Selecciona una clase</option>
          {uniqueClasses.map((cls, i) => (
            <option
              key={i}
              value={cls}
            >
              {cls}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}
