"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TravelerForm from "@/components/TravelerForm";
import type { TravelerFormData } from "@/types";
import { useRouter } from "next/navigation";

export default function Paso2() {
  const [formData, setFormData] = useState<TravelerFormData>({
    numTravelers: 1,
    travelers: [
      { fullName: "", birthDate: "", idType: "Cédula", idNumber: "" },
    ],
    hasPets: false,
    petCount: 0,
    hasExtraLuggage: false,
    extraLuggageCount: 0,
  });

  const [formError, setFormError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("flightData");
    if (!stored) {
      alert("No se encontró información previa. Redirigiendo a Paso 1.");
      router.push("/reserva/paso-1");
    }
  }, [router]);

  const handleSave = () => {
    setFormError("");

    for (const [index, traveler] of formData.travelers.entries()) {
      if (
        !traveler.fullName.trim() ||
        !traveler.birthDate.trim() ||
        !traveler.idType.trim() ||
        !traveler.idNumber.trim()
      ) {
        setFormError(
          `Por favor, completa todos los campos del viajero ${index + 1}.`
        );
        return;
      }

      // Validar que la fecha de nacimiento no sea futura
      const birthDate = new Date(traveler.birthDate);
      const today = new Date();
      if (birthDate > today) {
        setFormError(
          `La fecha de nacimiento del viajero ${index + 1} no puede ser futura.`
        );
        return;
      }
    }

    // Guardar en sessionStorage y navegar al siguiente paso
    sessionStorage.setItem("travelerData", JSON.stringify(formData));
    alert("Datos guardados correctamente.");
    // router.push("/reserva/paso-3");
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
          Datos de los <span className="text-indigo-600">Viajeros</span>
        </h1>
        <TravelerForm
          formData={formData}
          setFormData={setFormData}
        />

        {formError && (
          <p className="mt-4 text-red-600 text-sm font-medium text-center">
            {formError}
          </p>
        )}

        <button
          onClick={handleSave}
          className="mt-8 w-full py-3 rounded-full font-semibold text-white shadow-lg transition-colors bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
          type="button"
        >
          Continuar
        </button>
      </div>
    </motion.section>
  );
}
