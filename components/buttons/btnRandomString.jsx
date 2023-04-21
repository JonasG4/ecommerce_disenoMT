'use client'
import React from "react";

export default function ButtonGenerate({ onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center cursor-pointer hover:bg-gray-200 active:scale-95  duration-150 hover:ring-purple-600 z-50 rounded-l-md px-4 bg-gray-300 text-sm font-semibold text-gray-700 ring-1 ring-gray-500"
    >
      Generar
    </div>
  );
}
