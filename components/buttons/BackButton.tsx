"use client";

import { useRouter } from "next/navigation";

interface BackButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

export default function BackButton({
  href = "/",
  onClick,
  className = "",
  children = "Volver",
}: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.push(href);
    }
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className={`w-full sm:w-auto px-8 py-3 rounded-full font-semibold bg-gray-300 text-gray-800 hover:bg-gray-400 transition-colors shadow cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}
