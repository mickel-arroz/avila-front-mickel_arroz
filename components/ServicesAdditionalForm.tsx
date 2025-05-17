"use client";

import { ChangeEvent } from "react";
import { ServicesAdditionalFormProps } from "@/types/servicesAdditional";

const inputStyle =
  "w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition";

export default function ServicesAdditionalForm({
  formData,
  setFormData,
}: ServicesAdditionalFormProps) {
  const handleSwitchChange = (
    field: keyof typeof formData,
    checked: boolean
  ) => {
    if (field === "specialAssistance" && !checked) {
      setFormData({
        ...formData,
        specialAssistance: false,
        assistanceNote: "",
      });
    } else {
      setFormData({ ...formData, [field]: checked });
    }
  };

  const handleNoteChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 200) {
      setFormData({ ...formData, assistanceNote: value });
    }
  };

  // Checkbox personalizado con Tailwind y peer
  const Checkbox = ({
    checked,
    onChange,
    ariaLabel,
  }: {
    checked: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    ariaLabel: string;
  }) => (
    <label className="inline-flex items-center cursor-pointer select-none">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={ariaLabel}
        className="peer opacity-0 absolute w-6 h-6"
      />
      <span
        className="w-6 h-6 inline-block rounded-md border-2 border-indigo-500
          bg-indigo-100
          peer-checked:bg-indigo-600 peer-checked:border-indigo-600
          relative
          transition-colors
          flex-shrink-0
          "
      >
        {/* Check SVG visible solo cuando está checked */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="oklch(93% 0.034 272.788)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="icon icon-tabler icons-tabler-outline icon-tabler-check"
        >
          <path
            stroke="none"
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M5 12l5 5l10 -10" />
        </svg>
      </span>
    </label>
  );

  return (
    <form className="space-y-6 mb-12">
      {/* Seguro de viaje */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer text-gray-700 font-medium gap-3">
          <Checkbox
            checked={formData.travelInsurance}
            onChange={(e) =>
              handleSwitchChange("travelInsurance", e.target.checked)
            }
            ariaLabel="Seguro de viaje"
          />
          ¿Deseas agregar seguro de viaje?
        </label>
      </div>

      {/* Asientos preferenciales */}
      <div className="flex items-center justify-between">
        <label className="flex items-center cursor-pointer text-gray-700 font-medium gap-3">
          <Checkbox
            checked={formData.preferredSeats}
            onChange={(e) =>
              handleSwitchChange("preferredSeats", e.target.checked)
            }
            ariaLabel="Asientos preferenciales"
          />
          ¿Deseas seleccionar asientos preferenciales?
        </label>
      </div>

      {/* Asistencia especial */}
      <div className="flex flex-col">
        <label className="flex items-center cursor-pointer text-gray-700 font-medium gap-3">
          <Checkbox
            checked={formData.specialAssistance}
            onChange={(e) =>
              handleSwitchChange("specialAssistance", e.target.checked)
            }
            ariaLabel="Asistencia especial"
          />
          ¿Requiere asistencia especial?
        </label>

        {formData.specialAssistance && (
          <>
            <textarea
              className={`${inputStyle} mt-2 resize-none`}
              maxLength={200}
              placeholder="Escribe una nota breve (máx 200 caracteres)"
              value={formData.assistanceNote}
              onChange={handleNoteChange}
              aria-label="Nota de asistencia especial"
              rows={4}
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.assistanceNote.length}/200 caracteres
            </p>
          </>
        )}
      </div>
    </form>
  );
}
