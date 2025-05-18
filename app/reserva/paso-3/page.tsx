"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ServicesAdditionalForm from "@/components/ServicesAdditionalForm";
import type { ServicesAdditionalFormData } from "@/types/servicesAdditional";
import { useRouter } from "next/navigation";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import BackButton from "@/components/buttons/BackButton";

export default function Paso3() {
  const [formData, setFormData] = useState<ServicesAdditionalFormData>({
    travelInsurance: false,
    preferredSeats: false,
    specialAssistance: false,
    assistanceNote: "",
  });

  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const flightData = sessionStorage.getItem("flightData");
    if (!flightData) {
      alert(
        "No se encontró información previa del vuelo. Redirigiendo a Paso 1."
      );
      router.push("/reserva/paso-1");
    }

    const travelerData = sessionStorage.getItem("travelerData");
    if (!travelerData) {
      alert(
        "No se encontró información previa de los pasajeros. Redirigiendo a Paso 2."
      );
      router.push("/reserva/paso-2");
    }
  }, [router]);

  useEffect(() => {
    const stored = sessionStorage.getItem("servicesAdditionalData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setFormData(parsed);
    }
  }, []);

  const handleSave = async () => {
    setFormError("");

    if (formData.specialAssistance && !formData.assistanceNote.trim()) {
      setFormError("Por favor, escribe una nota para la asistencia especial.");
      return;
    }
    if (formData.assistanceNote.length > 200) {
      setFormError(
        "La nota de asistencia especial no puede exceder 200 caracteres."
      );
      return;
    }

    setIsLoading(true);

    try {
      // Simulación de procesamiento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      sessionStorage.setItem(
        "servicesAdditionalData",
        JSON.stringify(formData)
      );
      router.push("/reserva/paso-4");
    } finally {
      setIsLoading(false);
    }
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
        <h1 className="text-3xl font-extrabold text-gray-900 mb-14 text-center tracking-tight leading-tight">
          Servicios <span className="text-indigo-600">Adicionales</span>
        </h1>

        <ServicesAdditionalForm
          formData={formData}
          setFormData={setFormData}
        />

        {formError && (
          <p className="mt-4 text-red-600 text-sm font-medium text-center">
            {formError}
          </p>
        )}

        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-6">
          <BackButton href="/reserva/paso-2" />

          <PrimaryButton
            onClick={handleSave}
            isLoading={isLoading}
            normalText="Continuar"
            className="w-full sm:w-auto"
          />
        </div>
      </div>
    </motion.section>
  );
}
