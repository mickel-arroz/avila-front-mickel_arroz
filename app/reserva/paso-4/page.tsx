"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import ReservationSummary from "@/components/ReservationSummary";
import { ReservationSummaryData } from "@/types/reservationSummary";

export default function Paso4() {
  const router = useRouter();
  const [data, setData] = useState<ReservationSummaryData | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    try {
      const flight = JSON.parse(sessionStorage.getItem("flightData") || "{}");
      const travelers = JSON.parse(
        sessionStorage.getItem("travelerData") || "{}"
      );
      const services = JSON.parse(
        sessionStorage.getItem("servicesAdditionalData") || "{}"
      );

      if (
        !flight.destination ||
        !travelers.travelers ||
        travelers.travelers.length === 0
      ) {
        router.push("/reserva/paso-1");
        return;
      }

      const fullData: ReservationSummaryData = {
        destination: flight.destination,
        departureDate: flight.departureDate,
        returnDate: flight.returnDate,
        flightClass: flight.flightClass,
        priceUSD: flight.priceUSD,
        travelers: travelers.travelers,
        petCount: travelers.petCount,
        extraLuggageCount: travelers.extraLuggageCount,
        travelInsurance: services.travelInsurance,
        preferredSeats: services.preferredSeats,
        specialAssistance: services.specialAssistance,
        assistanceNote: services.assistanceNote,
      };

      setData(fullData);
    } catch (e) {
      console.error("Error cargando datos del resumen:", e);
    }
  }, [router]);

  const handleConfirm = () => {
    confetti({
      particleCount: 500,
      spread: 100,
      origin: { y: 0.8 },
      zIndex: 9999,
    });

    setConfirmed(true);
    // sessionStorage.clear();
    // router.push("/"); // Redirige a inicio o gracias
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
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full px-12 py-8 border border-gray-200">
        {data ? (
          <>
            <ReservationSummary data={data} />

            {confirmed && (
              <p className="text-green-600 text-center mt-8 font-medium text-lg">
                ¡Reserva confirmada!
              </p>
            )}

            <button
              onClick={handleConfirm}
              className="mt-8 w-full py-3 rounded-full font-semibold text-white shadow-lg transition-colors bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
            >
              Confirmar Reserva
            </button>
          </>
        ) : (
          <p className="text-center text-xl text-gray-600">
            Cargando resumen...
          </p>
        )}
      </div>
    </motion.section>
  );
}
