"use client";
import {
  UserIcon,
  LogoutIcon,
  LogoutRoundedIcon,
  UserPenIcon,
  AngleDown,
} from "../app/shared/CustomIcons";
import { useState, useEffect, useRef } from "react";

export default function UserButton() {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const isClickOutside2 = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", isClickOutside2);
    return () => {
      document.removeEventListener("click", isClickOutside2);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={ref}>
      <div
        className={`group w-12 h-12 rounded-full flex relative items-center justify-center cursor-pointer bg-purple-300`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="w-8 h-8 group-active:w-12 group-active:h-12 duration-200 ease-out rounded-full bg-purple-600 flex items-center justify-center">
          <UserIcon className="w-4 fill-gray-100 text-gray-100" />
        </div>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-2 px-5 py-3 rounded-md w-[250px] bg-gray-50 shadow-lg ring-1 ring-gray-300 right-0 absolute top-[3.4rem] z-50">
          <div className="flex flex-col items-center justify-center h-[75px] rounded-md bg-gray-100 py-2 px-3 ring-1 ring-gray-200 shadow-md">
            <h4 className="font-semibolf text-sm text-gray-800">Hola,</h4>
            <h1 className="text-xl font-bold text-gray-700">Jonas Garcia</h1>
          </div>
          <ul className="flex flex-col gap-3 mt-1">
            <li className="w-full flex items-center justify-start gap-3 p-2 cursor-pointer">
              <UserPenIcon className={'w-4 fill-slate-400 dark:text-gray-400'} />
              <h2 className="text-sm text-gray-700">
                Editar perfil
              </h2>
              <AngleDown className={'w-3 fill-gray-400 -rotate-90 ml-auto'} />
            </li>
            <li className="w-full flex items-center justify-start gap-3 p-2 cursor-pointer">
              <UserPenIcon className={'w-4 fill-slate-400 dark:text-gray-400'} />
              <h2 className="text-sm text-gray-700">
                Editar perfil
              </h2>
              <AngleDown className={'w-3 fill-gray-400 -rotate-90 ml-auto'} />
            </li>
            <li className="w-full flex items-center justify-start gap-3 p-2 cursor-pointer">
              <UserPenIcon className={'w-4 fill-slate-400 dark:text-gray-400'} />
              <h2 className="text-sm text-gray-700">
                Editar perfil
              </h2>
              <AngleDown className={'w-3 fill-gray-400 -rotate-90 ml-auto'} />
            </li>



            {/* LOGOUT */}
            <li className="flex items-center justify-center gap-2 w-full p-1 rounded-md bg-red-500 cursor-pointer hover:opacity-80 active:scale-95">
              <LogoutIcon className={`w-3 fill-gray-50 dark:text-gray-50`} />
              <span className="text-sm font-semibold text-gray-50">
                Cerrar sesión
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
