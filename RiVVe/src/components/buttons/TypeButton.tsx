import { useState } from "react";
import { X } from "lucide-react";

interface TypeButtonProps {
  type: string;
  isSelected: boolean;
  onClick: () => void;
}

function TypeButton({ type, isSelected, onClick }: TypeButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center px-4 py-1 border rounded-3xl mx-2 hover:cursor-pointer hover:bg-gray-600 ${
        isSelected
          ? "bg-gray-600 text-white border-gray-600"
          : "bg-transparent border-gray-500 text-black"
      }`}
    >
      {type}
      {isSelected && <X size={16} className="ml-2 cursor-pointer" />}
    </button>
  );
}

export default TypeButton;
