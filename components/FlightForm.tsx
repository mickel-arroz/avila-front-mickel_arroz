"use client";

import { useEffect, useState } from "react";
import { fetchFlights } from "@/lib/api";
import type { Flight, FlightFormProps } from "@/types";

type FlightField =
  | "destination"
  | "departureDate"
  | "returnDate"
  | "flightClass";

interface Props extends FlightFormProps {
  fieldErrors?: Partial<Record<FlightField, string>>;
  onFlightsLoaded?: (flights: Flight[]) => void;
}

export default function FlightForm({
  destination,
  departureDate,
  returnDate,
  flightClass,
  onChange,
  fieldErrors,
  onFlightsLoaded,
}: Props) {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    fetchFlights()
      .then((data) => {
        setFlights(data);
        onFlightsLoaded?.(data);
      })
      .catch(console.error);
  }, []);

  const uniqueDestinations = [...new Set(flights.map((f) => f.destination))];
  const uniqueClasses = [...new Set(flights.map((f) => f.class))];

  const getInputClasses = (hasError?: boolean) =>
    `w-full border rounded-md px-4 py-2 transition focus:outline-none ${
      hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-300"
        : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
    }`;

  return (
    <form className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Destino */}
      <div>
        <select
          className={getInputClasses(!!fieldErrors?.destination)}
          value={destination}
          onChange={(e) => onChange("destination", e.target.value)}
        >
          <option value="">Selecciona un destino</option>
          {uniqueDestinations.map((dest, i) => (
            <option
              key={i}
              value={dest}
            >
              {dest}
            </option>
          ))}
        </select>

        {fieldErrors?.destination && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.destination}</p>
        )}
      </div>

      {/* Fecha de salida */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Fecha de salida
        </label>
        <input
          type="date"
          className={getInputClasses(fieldErrors?.departureDate !== undefined)}
          value={departureDate}
          onChange={(e) => onChange("departureDate", e.target.value)}
        />
        {fieldErrors?.departureDate && (
          <p className="text-sm text-red-600 mt-1">
            {fieldErrors.departureDate}
          </p>
        )}
      </div>

      {/* Fecha de regreso */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Fecha de regreso
        </label>
        <input
          type="date"
          className={getInputClasses(fieldErrors?.returnDate !== undefined)}
          value={returnDate}
          onChange={(e) => onChange("returnDate", e.target.value)}
        />
        {fieldErrors?.returnDate && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.returnDate}</p>
        )}
      </div>

      {/* Clase de vuelo */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Clase de vuelo
        </label>
        <select
          className={getInputClasses(fieldErrors?.flightClass !== undefined)}
          value={flightClass}
          onChange={(e) => onChange("flightClass", e.target.value)}
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
        {fieldErrors?.flightClass && (
          <p className="text-sm text-red-600 mt-1">{fieldErrors.flightClass}</p>
        )}
      </div>
    </form>
  );
}
