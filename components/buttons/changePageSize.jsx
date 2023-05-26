import React from "react";

export default function ChangePageSize({ onChangePageSize }) {
  return (
    <select
      onChange={onChangePageSize}
      className=" cursor-pointer bg-gray-100 border-none ring-1 ring-gray-400 hover:ring-blue-500 text-gray-700  text-sm rounded-md focus:ring-blue-500 block py-2 pl-4 pr-7 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    >
      <option defaultChecked value="10">
        Mostrar 10
      </option>
      <option value="30">Mostrar 20</option>
      <option value="100">Mostrar 50</option>
      <option value="500">Mostrar 100</option>
      <option value="1000">Mostrar 500</option>
    </select>
  );
}
