"use client";

interface PrimaryButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading: boolean;
  loadingText?: string;
  normalText: string;
  className?: string;
  type?: "button" | "submit" | "reset";
}

export default function PrimaryButton({
  onClick,
  disabled = false,
  isLoading,
  loadingText = "Procesando...",
  normalText,
  className = "",
  type = "button",
}: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      type={type}
      className={`px-12 py-3 rounded-full font-semibold text-white shadow-lg transition-colors flex items-center justify-center gap-2 ${
        !disabled && !isLoading
          ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-300 cursor-pointer"
          : "bg-gray-400 cursor-not-allowed"
      } ${className}`}
    >
      {isLoading ? (
        <>
          <Spinner />
          {loadingText}
        </>
      ) : (
        normalText
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );
}
