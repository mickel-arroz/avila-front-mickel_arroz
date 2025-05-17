"use client";

import { TravelerFormProps } from "@/types";
import { ChangeEvent } from "react";

export default function TravelerForm({
  formData,
  setFormData,
  fieldErrors,
}: TravelerFormProps & {
  fieldErrors?: Record<
    number,
    Partial<Record<"fullName" | "birthDate" | "idType" | "idNumber", string>>
  >;
}) {
  const getInputClasses = (hasError?: boolean) =>
    `w-full border rounded-md px-4 py-2 focus:outline-none transition ${
      hasError
        ? "border-red-500 focus:ring-2 focus:ring-red-300"
        : "border-gray-300 focus:ring-2 focus:ring-indigo-500"
    }`;

  const handleTravelerChange = (
    index: number,
    field: "fullName" | "birthDate" | "idType" | "idNumber",
    value: string
  ) => {
    const updatedTravelers = [...formData.travelers];
    updatedTravelers[index] = { ...updatedTravelers[index], [field]: value };
    setFormData({ ...formData, travelers: updatedTravelers });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;

    const val =
      type === "checkbox"
        ? checked
        : type === "number"
        ? parseInt(value)
        : value;

    if (name === "numTravelers") {
      const num = parseInt(value);
      const travelers = [...formData.travelers];
      if (num > travelers.length) {
        for (let i = travelers.length; i < num; i++) {
          travelers.push({
            fullName: "",
            birthDate: "",
            idType: "",
            idNumber: "",
          });
        }
      } else {
        travelers.length = num;
      }
      setFormData({ ...formData, numTravelers: num, travelers });
    } else {
      setFormData({ ...formData, [name]: val });
    }
  };

  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Número de viajeros
        </label>
        <input
          type="number"
          name="numTravelers"
          min={1}
          max={10}
          className={getInputClasses()}
          value={formData.numTravelers}
          onChange={handleChange}
        />
      </div>

      {formData.travelers.map((traveler, i) => (
        <div
          key={i}
          className="p-4 border border-gray-200 rounded-lg space-y-4 bg-white/60"
        >
          <h3 className="font-semibold text-indigo-600">Viajero {i + 1}</h3>

          {/* Nombre completo */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              Nombre completo
            </label>
            <input
              type="text"
              className={getInputClasses(
                fieldErrors?.[i]?.fullName !== undefined
              )}
              value={traveler.fullName}
              onChange={(e) =>
                handleTravelerChange(i, "fullName", e.target.value)
              }
            />
            {fieldErrors?.[i]?.fullName && (
              <p className="text-sm text-red-600 mt-1">
                {fieldErrors[i].fullName}
              </p>
            )}
          </div>

          {/* Fecha de nacimiento */}
          <div>
            <label className="block text-sm mb-1 text-gray-700">
              Fecha de nacimiento
            </label>
            <input
              type="date"
              className={getInputClasses(
                fieldErrors?.[i]?.birthDate !== undefined
              )}
              value={traveler.birthDate}
              onChange={(e) =>
                handleTravelerChange(i, "birthDate", e.target.value)
              }
            />
            {fieldErrors?.[i]?.birthDate && (
              <p className="text-sm text-red-600 mt-1">
                {fieldErrors[i].birthDate}
              </p>
            )}
          </div>

          {/* Tipo y número de documento */}
          <div className="flex gap-2">
            <div className="w-1/3">
              <label className="block text-sm mb-1 text-gray-700">
                Tipo de documento
              </label>
              <select
                className={getInputClasses(
                  fieldErrors?.[i]?.idType !== undefined
                )}
                value={traveler.idType}
                onChange={(e) =>
                  handleTravelerChange(i, "idType", e.target.value)
                }
              >
                <option value="">Seleccione</option>
                <option value="Cédula">Cédula</option>
                <option value="Pasaporte">Pasaporte</option>
              </select>
              {fieldErrors?.[i]?.idType && (
                <p className="text-sm text-red-600 mt-1">
                  {fieldErrors[i].idType}
                </p>
              )}
            </div>

            <div className="w-2/3">
              <label className="block text-sm mb-1 text-gray-700">
                Número de documento
              </label>
              <input
                type="text"
                className={getInputClasses(
                  fieldErrors?.[i]?.idNumber !== undefined
                )}
                value={traveler.idNumber}
                onChange={(e) =>
                  handleTravelerChange(i, "idNumber", e.target.value)
                }
              />
              {fieldErrors?.[i]?.idNumber && (
                <p className="text-sm text-red-600 mt-1">
                  {fieldErrors[i].idNumber}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Sección mascotas */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            ¿Viajas con mascotas?
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasPets"
                checked={formData.hasPets === true}
                onChange={() => setFormData({ ...formData, hasPets: true })}
              />
              Sí
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasPets"
                checked={formData.hasPets === false}
                onChange={() =>
                  setFormData({ ...formData, hasPets: false, petCount: 0 })
                }
              />
              No
            </label>
          </div>
          {formData.hasPets && (
            <div className="mt-2">
              <label className="block text-sm mb-1 text-gray-700">
                Cantidad de mascotas
              </label>
              <input
                type="number"
                name="petCount"
                min={1}
                className={getInputClasses()}
                value={formData.petCount}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">Costo: $100 c/u</p>
            </div>
          )}
        </div>

        {/* Sección maletas */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">
            ¿Necesitas maletas extra?
          </label>
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasExtraLuggage"
                checked={formData.hasExtraLuggage === true}
                onChange={() =>
                  setFormData({ ...formData, hasExtraLuggage: true })
                }
              />
              Sí
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="hasExtraLuggage"
                checked={formData.hasExtraLuggage === false}
                onChange={() =>
                  setFormData({
                    ...formData,
                    hasExtraLuggage: false,
                    extraLuggageCount: 0,
                  })
                }
              />
              No
            </label>
          </div>
          {formData.hasExtraLuggage && (
            <div className="mt-2">
              <label className="block text-sm mb-1 text-gray-700">
                Cantidad de maletas
              </label>
              <input
                type="number"
                name="extraLuggageCount"
                min={1}
                className={getInputClasses()}
                value={formData.extraLuggageCount}
                onChange={handleChange}
              />
              <p className="text-xs text-gray-500 mt-1">Costo: $50 c/u</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
