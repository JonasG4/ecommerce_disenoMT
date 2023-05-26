"use client";
import React from "react";
import { BellIcon } from "../app/shared/CustomIcons";
import { useState, useEffect, useRef } from "react";

export default function Notificacion({ children }) {
  const [isActive, setActive] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isActive && ref.current && !ref.current.contains(e.target)) {
        setActive(false);
      }
    };

    document.addEventListener("click", isClickOutside);
    return () => {
      document.removeEventListener("click", isClickOutside);
    };
  }, [isActive]);

  return (
    <div className="relative" ref={ref}>
      <div
        className={`w-10 h-10 rounded-full duration-200 ease-in-out flex items-center relative cursor-pointer justify-center  hover:opacity-70 active:scale-[.85] 
        ${
          isActive ? "bg-blue-200" : "bg-gray-200"
        }`}
        onClick={() => setActive(!isActive)}
      >
        <BellIcon
          className={`w-5 h-5 ${
            isActive
              ? "fill-blue-500 text-blue-500"
              : "fill-gray-500 text-gray-500"
          }`}
        />
        <div className="absolute w-[6px] h-[6px] rounded-full bg-red-500 top-3 right-[11px] text-white text-[12px] font-semibold flex items-center justify-center"></div>
      </div>
      {isActive && children}
    </div>
  );
}
