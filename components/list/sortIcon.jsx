"use client";
import { useState } from "react";
import { SortIcon } from "@/app/shared/CustomIcons";

export function SortById({ field, data, setData }) {
  const [isOrderASC, setOrderAsc] = useState(true);

  const handlerClick = () => {
    setOrderAsc(!isOrderASC);
    const list = data.sort((a, b) => {
      if (isOrderASC) {
        if (a[field] > b[field]) {
          return 1;
        }

        if (a[field] < b[field]) {
          return -1;
        }
      } else {
        if (a[field] < b[field]) {
          return 1;
        }

        if (a[field] > b[field]) {
          return -1;
        }
      }
      return 0;
    });
    setData([...list]);
  };

  return (
    <SortIcon
      className={`w-2 cursor-pointer select-none ${
        isOrderASC
          ? "fill-gray-700 text-gray-400"
          : "fill-gray-400 text-gray-700"
      }`}
      onClick={handlerClick}
    />
  );
}

export function SortBy({ field, data, setData }) {
  const [isOrderASC, setOrderAsc] = useState(false);

  const handlerClick = () => {
    setOrderAsc(!isOrderASC);
    const list = data.sort((a, b) => {
      if (isOrderASC) {
        if (a[field].toLowerCase() > b[field].toLowerCase()) {
          return 1;
        }

        if (a[field].toLowerCase() < b[field].toLowerCase()) {
          return -1;
        }
      } else {
        if (a[field].toLowerCase() < b[field].toLowerCase()) {
          return 1;
        }
        if (a[field].toLowerCase() > b[field].toLowerCase()) {
          return -1;
        }
      }
      return 0;
    });

    setData([...list]);
  };

  return (
    <SortIcon
      className={`w-2 cursor-pointer select-none ${
        isOrderASC
          ? "fill-gray-700 text-gray-400"
          : "fill-gray-400 text-gray-700"
      }`}
      onClick={handlerClick}
    />
  );
}
