"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import ReservationSummary from "@/components/ReservationSummary";
import { ReservationSummaryData } from "@/types/reservationSummary";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import BackButton from "@/components/buttons/BackButton";

export default function Paso4() {
  const router = useRouter();
  const [data, setData] = useState<ReservationSummaryData | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      confetti({
        particleCount: 500,
        spread: 100,
        origin: { y: 0.8 },
        zIndex: 9999,
      });
      setConfirmed(true);
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
      <div className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-3xl w-full px-4 md:px-12 py-8 my-4 border border-gray-200">
        {data ? (
          <>
            <ReservationSummary data={data} />

            {confirmed && (
              <p className="text-green-600 text-center mt-8 font-medium text-lg">
                ¡Reserva confirmada!
              </p>
            )}

            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-5">
              <BackButton onClick={() => router.push("/reserva/paso-3")} />

              <PrimaryButton
                onClick={handleConfirm}
                isLoading={isLoading}
                normalText="Confirmar Reserva"
                disabled={confirmed}
              />
            </div>
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
