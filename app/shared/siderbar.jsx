'use client'
import { useState } from "react";
import LogoAdmin from "../../public/prueba4.png";
import Image from "next/image";
import Link from "next/link";
import { HouseIcon, TagIcon, UserGroupIcon, BarsIcon } from "../shared/CustomIcons";

export default function siderbar() {
  
  const showSideBar = () => {
      
  }

  return (
    <div className="w-[300px] h-screen  bg-gray-100 border-r-2 border-gray-300 shadow-lg">
      <div className="h-[70px] border-b-[1px] border-gray-300 p-3 flex justify-around">
        <Image src={LogoAdmin} alt="Logo de DiseñosMT" className="w-[150px]" onClick={showSideBar} />
        <BarsIcon className="fill-gray-400 w-5" />
      </div>
      <ul className="flex flex-col gap-2 px-4 mt-5">
        <li>
          <Link
            className="w-full px-4 py-3 rounded-md text-purple-900 font-bold flex gap-4 bg-purple-200"
            href={"/dashboard"}
          >
            <HouseIcon className="w-5 fill-purple-800 dark:text-purple-800 text-purple-200" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="w-full px-4 py-3 rounded-md text-gray-600 font-semibold flex gap-4"
            href={"/clientes"}
          >
            <UserGroupIcon className="w-5 fill-gray-400 text-gray-400" />
            Clientes
          </Link>
        </li>
        <li>
          <Link
            className="w-full px-4 py-3 rounded-md text-gray-600 font-semibold flex gap-4"
            href={"/clientes"}
          >
            <TagIcon className="w-5 fill-gray-400" />
            Clientes
          </Link>
        </li>
      </ul>
    </div>
  );
}
