"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-gradient-to-tr from-blue-50 via-purple-100 to-pink-50 flex items-center justify-center px-6 py-12 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-radial from-purple-300 via-blue-200 to-pink-200 opacity-30 animate-[pulse_15s_ease-in-out_infinite]"
      />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative bg-white bg-opacity-90 backdrop-blur-md rounded-3xl shadow-2xl max-w-lg w-full p-12 border border-gray-200"
      >
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight leading-tight">
          Bienvenido a <span className="text-indigo-600">Globetrotter</span>
        </h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Tu portal para reservar viajes de forma{" "}
          <span className="font-semibold">moderna</span> y{" "}
          <span className="font-semibold">personalizada</span>.
        </p>

        <p className="text-sm text-gray-400 mb-10 italic">
          Desarrollado con 💙 por{" "}
          <span className="font-medium text-indigo-600">Mickel Arroz</span>
        </p>

        <Link
          href="/reserva/paso-1"
          passHref
        >
          <motion.button
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-colors cursor-pointer"
          >
            Reservar viaje
          </motion.button>
        </Link>
      </motion.div>
    </main>
  );
}
