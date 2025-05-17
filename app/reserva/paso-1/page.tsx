"use client";

import { useEffect, useState } from "react";
import FlightForm from "@/components/FlightForm";
import { motion } from "framer-motion";
import type { FlightData } from "@/types";
import { useRouter } from "next/navigation";

export default function Paso1() {
  const [flightData, setFlightData] = useState<FlightData>({
    destination: "",
    departureDate: "",
    returnDate: "",
    flightClass: "",
  });

  const router = useRouter();

  const [dateError, setDateError] = useState("");

  useEffect(() => {
    sessionStorage.removeItem("flightData");
  }, []);

  const handleChange = (field: keyof FlightData, value: string) => {
    setFlightData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = Object.values(flightData).every(
    (val) => val.trim() !== ""
  );

  const handleSave = () => {
    setDateError("");
    if (!isFormValid) return;

    const dep = new Date(flightData.departureDate);
    const ret = new Date(flightData.returnDate);

    if (ret < dep) {
      setDateError("La fecha de regreso no puede ser anterior a la de salida.");
      return;
    } else if (dep < new Date()) {
      setDateError(
        "La fecha de salida no puede ser anterior a la fecha actual."
      );
    }
    sessionStorage.setItem("flightData", JSON.stringify(flightData));
    router.push("/reserva/paso-2");
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative min-h-screen bg-gradient-to-tr from-blue-50 via-purple-100 to-pink-50 flex flex-col items-center justify-center px-6 py-12 overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-radial from-purple-300 via-blue-200 to-pink-200 opacity-30 animate-[pulse_15s_ease-in-out_infinite]"
      />
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full p-12 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight leading-tight">
          Información del <span className="text-indigo-600">Viaje</span>
        </h1>
        <FlightForm
          destination={flightData.destination}
          departureDate={flightData.departureDate}
          returnDate={flightData.returnDate}
          flightClass={flightData.flightClass}
          onChange={handleChange}
        />

        {dateError && (
          <p className="mt-4 text-red-600 text-sm font-medium text-center">
            {dateError}
          </p>
        )}

        <button
          onClick={handleSave}
          disabled={!isFormValid}
          className={`mt-8 w-full py-3 rounded-full font-semibold text-white shadow-lg transition-colors ${
            isFormValid
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          type="button"
        >
          Continuar
        </button>
      </div>
    </motion.section>
  );
}
