"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TravelerForm from "@/components/TravelerForm";
import type { TravelerFormData } from "@/types";
import { useRouter } from "next/navigation";

export default function Paso2() {
  const [formData, setFormData] = useState<TravelerFormData>({
    numTravelers: 1,
    travelers: [{ fullName: "", birthDate: "", idType: "", idNumber: "" }],
    hasPets: false,
    petCount: 0,
    hasExtraLuggage: false,
    extraLuggageCount: 0,
  });

  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Record<
      number,
      Partial<Record<keyof TravelerFormData["travelers"][0], string>>
    >
  >({});

  const router = useRouter();

  useEffect(() => {
    const stored = sessionStorage.getItem("flightData");
    if (!stored) {
      alert("No se encontró información previa. Redirigiendo a Paso 1.");
      router.push("/reserva/paso-1");
    }
  }, [router]);

  useEffect(() => {
    sessionStorage.removeItem("travelerData");
  }, []);

  const handleSave = () => {
    setFormError("");
    const newErrors: typeof fieldErrors = {};

    formData.travelers.forEach((traveler, index) => {
      const travelerErrors: Partial<Record<keyof typeof traveler, string>> = {};

      if (!traveler.fullName.trim()) {
        travelerErrors.fullName = "El nombre es obligatorio.";
      }

      if (!traveler.birthDate.trim()) {
        travelerErrors.birthDate = "La fecha de nacimiento es obligatoria.";
      } else {
        const birthDate = new Date(traveler.birthDate);
        const today = new Date();
        if (birthDate > today) {
          travelerErrors.birthDate =
            "La fecha de nacimiento no puede ser futura.";
        }
      }

      if (!traveler.idType.trim() || traveler.idType === "Seleccione") {
        travelerErrors.idType = "Selecciona un tipo de documento.";
      }

      if (!traveler.idNumber.trim()) {
        travelerErrors.idNumber = "El número de documento es obligatorio.";
      }

      if (Object.keys(travelerErrors).length > 0) {
        newErrors[index] = travelerErrors;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      setFormError("Por favor, corrige los campos marcados.");
      return;
    }

    setFieldErrors({});
    sessionStorage.setItem("travelerData", JSON.stringify(formData));
    router.push("/reserva/paso-3");
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
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full p-12 border border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6 text-center tracking-tight leading-tight">
          Datos de los <span className="text-indigo-600">Viajeros</span>
        </h1>
        <TravelerForm
          formData={formData}
          setFormData={setFormData}
          fieldErrors={fieldErrors}
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
