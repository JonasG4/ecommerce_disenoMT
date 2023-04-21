"use client";
import React from "react";
import { BoxCheckIcon } from "../../app/shared/CustomIcons";

export default function ItemList({ item, key, handleChangeStatus }) {
  return (
    <li
      key={key}
      className={`w-full h-[75px] relative rounded-md bg-gray-100 py-2 px-3 ring-1 ring-gray-200 items-start flex gap-3 cursor-pointer hover:opacity-80 hover:ring-purple-500`}
      onClick={()=>{handleChangeStatus}}
>
      <BoxCheckIcon
        className={`w-5 
      ${item.isSeen ? "fill-gray-400" : "fill-purple-500"} 
      text-green-600 mt-1`}
      />
      <div className="flex flex-col justify-center">
        <h2 className="text-sm text-gray-800">
          <span className={`${item.isSeen ? 'font-semibold' : 'font-bold '}`}>{item.name}</span> ha realizado un nuevo
          pedido.
        </h2>
        <p
          className={`text-[12px]  ${
            item.isSeen
              ? "text-gray-500 font-light"
              : "font-bold text-purple-500"
          }`}
        >
          {item.ago}
        </p>
      </div>
      {!item.isSeen && (
        <div className="absolute w-2 h-2 bg-purple-500 rounded-full right-2 top-1/2 z-10"></div>
      )}
    </li>
  );
}
