"use client";

import { ReservationSummaryData } from "@/types/reservationSummary";
import dayjs from "dayjs";

interface Props {
  data: ReservationSummaryData;
}

export default function ReservationSummary({ data }: Props) {
  const getAge = (birthDate: string) => {
    const birth = dayjs(birthDate);
    const today = dayjs();
    const age = today.diff(birth, "year");

    // Verificar si ya pasó el cumpleaños este año
    const hasHadBirthday = today.isAfter(birth.year(today.year()));

    return hasHadBirthday ? age : age - 1;
  };

  const travelersCount = data.travelers.length;
  const flightBaseCost = data.priceUSD * travelersCount;
  const petCost = data.petCount * 100;
  const luggageCost = data.extraLuggageCount * 50;
  const totalCost = flightBaseCost + petCost + luggageCost;

  return (
    <div className="space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold text-indigo-700 text-center mb-4">
        Resumen de Reserva
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow border border-gray-200">
        {/* Detalles del viaje */}
        <div className="space-y-2">
          <p>
            <strong>Destino:</strong> {data.destination}
          </p>
          <p>
            <strong>Fechas:</strong>{" "}
            {dayjs(data.departureDate).format("DD/MM/YYYY")} al{" "}
            {dayjs(data.returnDate).format("DD/MM/YYYY")}
          </p>
          <p>
            <strong>Clase de vuelo:</strong> {data.flightClass}
          </p>
          {/* Mascotas */}
          {typeof data?.petCount === "number" && data.petCount > 0 && (
            <div className="xl:mt-8">
              <p>
                <strong>Mascotas:</strong> {data.petCount}
              </p>
            </div>
          )}

          {/* Maletas extra */}
          {typeof data?.extraLuggageCount === "number" &&
            data.extraLuggageCount > 0 && (
              <div>
                <p>
                  <strong>Maletas extra:</strong> {data.extraLuggageCount}
                </p>
              </div>
            )}
        </div>

        {/* Viajeros */}
        <div className="space-y-2">
          <p>
            <strong>Viajeros:</strong> {data.travelers.length}
          </p>
          <ul className="ml-4 list-disc text-sm text-gray-600">
            {data.travelers.map((t, i) => (
              <li key={i}>
                {t.fullName} ({getAge(t.birthDate)} años)
              </li>
            ))}
          </ul>
        </div>

        {/* Servicios adicionales */}
        <div className="md:col-span-2">
          <hr className="my-4 border-gray-300" />
          <p className="font-semibold text-gray-700 mb-2">
            Servicios adicionales:
          </p>
          <ul className="ml-4 list-disc text-sm text-gray-600">
            {data.travelInsurance && <li>Seguro de viaje</li>}
            {data.preferredSeats && <li>Asientos preferenciales</li>}
            {data.specialAssistance && (
              <>
                <li>Asistencia especial</li>
                {data.assistanceNote && (
                  <li className="ml-4 text-xs italic text-gray-500">
                    Nota: {data.assistanceNote}
                  </li>
                )}
              </>
            )}
            {!data.travelInsurance &&
              !data.preferredSeats &&
              !data.specialAssistance && <li>Ninguno</li>}
          </ul>
          {/* 🧾 Factura detallada */}
          <hr className="my-6 border-gray-300" />
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-2">
              Detalle de costos
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li className="flex justify-between">
                <span>
                  Vuelo ({travelersCount} x ${data.priceUSD.toFixed(2)}):
                </span>
                <span>${flightBaseCost.toFixed(2)} USD</span>
              </li>
              {petCost > 0 && (
                <li className="flex justify-between">
                  <span>Mascotas ({data.petCount} x $100):</span>
                  <span>${petCost.toFixed(2)} USD</span>
                </li>
              )}
              {luggageCost > 0 && (
                <li className="flex justify-between">
                  <span>Maletas extra ({data.extraLuggageCount} x $50):</span>
                  <span>${luggageCost.toFixed(2)} USD</span>
                </li>
              )}
            </ul>
          </div>
          {/* ✅ Total final */}
          <hr className="my-4 border-gray-300" />
          <p className="text-right font-bold text-lg text-indigo-700">
            Total: ${totalCost.toFixed(2)} USD
          </p>
        </div>
      </div>
    </div>
  );
}
