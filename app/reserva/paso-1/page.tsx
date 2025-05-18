"use client";

import { useCallback, useEffect, useState } from "react";
import FlightForm from "@/components/FlightForm";
import { motion } from "framer-motion";
import type { Flight, FlightData } from "@/types";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import BackButton from "@/components/buttons/BackButton";

export default function Paso1() {
  const [flightData, setFlightData] = useState<FlightData>({
    destination: "",
    departureDate: "",
    returnDate: "",
    flightClass: "",
    priceUSD: 0,
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [dateError, setDateError] = useState("");
  const [availableFlights, setAvailableFlights] = useState<Flight[]>([]);
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof FlightData, string>>
  >({});

  useEffect(() => {
    const stored = sessionStorage.getItem("flightData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setFlightData(parsed);
    }
  }, []);

  const handleFlightsLoaded = useCallback((flights: Flight[]) => {
    setAvailableFlights(flights);
    setFetchError(null);
  }, []);

  const handleFetchError = useCallback((error: string) => {
    console.error("Error en FlightForm:", error);
    setFetchError(error);
  }, []);

  const handleChange = (field: keyof FlightData, value: string) => {
    setFlightData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid =
    flightData.destination.trim() !== "" &&
    flightData.departureDate.trim() !== "" &&
    flightData.returnDate.trim() !== "" &&
    flightData.flightClass.trim() !== "";

  const handleSave = async () => {
    setDateError("");
    const errors: Partial<Record<keyof FlightData, string>> = {};

    if (!flightData.destination.trim())
      errors.destination = "El destino es obligatorio.";
    if (!flightData.departureDate.trim())
      errors.departureDate = "La fecha de salida es obligatoria.";
    if (!flightData.returnDate.trim())
      errors.returnDate = "La fecha de regreso es obligatoria.";
    if (!flightData.flightClass.trim())
      errors.flightClass = "La clase de vuelo es obligatoria.";

    const dep = dayjs(flightData.departureDate);
    const ret = dayjs(flightData.returnDate);
    const today = dayjs().startOf("day");

    if (flightData.departureDate && dep.isBefore(today)) {
      errors.departureDate = "La fecha de salida no puede ser anterior a hoy.";
    }

    if (flightData.returnDate && ret.isBefore(dep)) {
      errors.returnDate =
        "La fecha de regreso no puede ser anterior a la de salida.";
    }

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setIsLoading(true);

    // Simulación de procesamiento
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const matchedFlight = availableFlights.find(
      (f) =>
        f.destination === flightData.destination &&
        f.class === flightData.flightClass
    );

    const updatedFlightData = {
      ...flightData,
      priceUSD: matchedFlight?.priceUSD ?? 0,
    };

    sessionStorage.setItem("flightData", JSON.stringify(updatedFlightData));
    router.push("/reserva/paso-2");
    setIsLoading(false);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-gradient-to-tr from-blue-50 via-purple-100 to-pink-50 flex flex-col items-center justify-center overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-radial from-purple-300 via-blue-200 to-pink-200 opacity-30 animate-[pulse_15s_ease-in-out_infinite]"
      />
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full md:p-12 py-10 px-6 my-6 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight leading-tight">
          Información del <span className="text-indigo-600">Viaje</span>
        </h1>
        {fetchError && (
          <div className="mb-6 bg-red-50 border-1 border-l-4 border-red-200 border-l-red-500 p-4 rounded-md">
            <div className="flex items-start gap-3">
              <svg
                className="h-5 w-5 text-red-500 mt-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Error al cargar los vuelos
                </h3>
                <p className="text-sm text-red-700 mt-1">{fetchError}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-2 text-sm text-red-600 font-semibold cursor-pointer hover:underline"
                >
                  Reintentar
                </button>
              </div>
            </div>
          </div>
        )}

        <FlightForm
          destination={flightData.destination}
          departureDate={flightData.departureDate}
          returnDate={flightData.returnDate}
          flightClass={flightData.flightClass}
          onChange={handleChange}
          fieldErrors={fieldErrors}
          onFlightsLoaded={handleFlightsLoaded}
          onFetchError={handleFetchError}
        />

        {dateError && (
          <p className="mt-4 text-red-600 text-sm font-medium text-center">
            {dateError}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-5">
          <BackButton />

          <PrimaryButton
            onClick={handleSave}
            disabled={!isFormValid || !!fetchError}
            isLoading={isLoading}
            normalText="Continuar"
            className="w-full sm:w-auto"
          ></PrimaryButton>
        </div>
      </div>
    </motion.section>
  );
}
