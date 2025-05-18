"use client";

import { useEffect, useState } from "react";
import Select, { StylesConfig } from "react-select";
import { fetchFlights } from "@/lib/api";
import type { Flight, FlightFormProps } from "@/types";
import dayjs from "dayjs";

type FlightField =
  | "destination"
  | "departureDate"
  | "returnDate"
  | "flightClass";

interface Props extends FlightFormProps {
  fieldErrors?: Partial<Record<FlightField, string>>;
  onFlightsLoaded?: (flights: Flight[]) => void;
}

// Tipo para las opciones del Select
type SelectOption = { label: string; value: string };

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

  const today = dayjs().format("YYYY-MM-DD");

  const uniqueDestinations = [...new Set(flights.map((f) => f.destination))];
  const uniqueClasses = [...new Set(flights.map((f) => f.class))];

  const getInputClasses = (hasError?: boolean) =>
    `w-full border rounded-md px-4 py-2 transition focus:outline-none ${
      hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-300"
        : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
    }`;

  const selectStyles: StylesConfig<SelectOption, false> = {
    control: (base, state) => ({
      ...base,
      borderRadius: "0.375rem", // rounded-md
      borderColor: fieldErrors?.destination ? "#f87171" : "#d1d5db", // red-400 o gray-300
      boxShadow: state.isFocused
        ? `0 0 0 2px ${fieldErrors?.destination ? "#fecaca" : "#c7d2fe"}`
        : "none", // red-200 o indigo-200
      "&:hover": {
        borderColor: fieldErrors?.destination ? "#f87171" : "#6366f1", // hover
      },
      padding: "0.15rem 0.25rem",
      minHeight: "2.5rem",
    }),
    menu: (base) => ({
      ...base,
      zIndex: 10,
    }),
  };

  return (
    <form className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-md rounded-md">
      {/* Destino */}
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Destino
        </label>

        <Select<SelectOption, false>
          options={uniqueDestinations.map((d) => ({ value: d, label: d }))}
          value={
            destination ? { value: destination, label: destination } : null
          }
          onChange={(selectedOption) =>
            onChange("destination", selectedOption?.value || "")
          }
          placeholder="Selecciona un destino"
          styles={selectStyles}
          isSearchable
        />

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
          min={today}
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
          min={today}
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
