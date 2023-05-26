import React from "react";
import {
  ListIcon,
  CloudArrowDownIcon,
  CiruclePlusIcon,
} from "@/app/shared/CustomIcons";
import Link from "next/link";

export default function TitleList({ title, btnTitle, btnLink, list }) {
  return (
    <section className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-md shadow-md">
      <h1 className="text-xl font-black text-gray-700 flex items-center gap-3">
        <ListIcon className={"w-5 fill-gray-400 text-blue-600"} />
        <p>{title}</p>
      </h1>
      <div className="flex items-center justify-center gap-4">
        {/* <button
          className="py-2 px-3 ring-1 shadow-md ring-gray-400 rounded-md  hover:ring-blue-500 bg-gray-100  text-sm duration-200 flex items-center gap-2 group/exportar"
          href={"/clientes/create"}
        >
          <CloudArrowDownIcon
            className={
              "w-4 fill-gray-500 text-gray-50 group-hover/exportar:fill-blue-500"
            }
          />
          <p className="text-gray-600 group-hover/exportar:text-blue-500">
            Expotar
          </p>
        </button> */}
        <Link
          className="py-2 px-3 ring-1 shadow-md ring-blue-600 rounded-md flex bg-blue-600 text-gray-50 text-sm 
      hover:bg-blue-700 hover:text-gray-50 duration-200"
          href={btnLink}
        >
          <CiruclePlusIcon className={"w-4 mr-2 fill-gray-50 text-blue-600"} />
          <p>{btnTitle}</p>
        </Link>
      </div>
    </section>
  );
}
