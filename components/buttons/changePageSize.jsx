import React from "react";

export default function ChangePageSize({onChangePageSize}) {
  return (
    <select 
    onChange={(e) => onChangePageSize(e)}
    className="cursor-pointer bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-[120px] py-2 px-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
      <option defaultChecked value="10">
        Mostrar 10
      </option>
      <option value="30">Mostrar 30</option>
      <option value="100">Mostrar 100</option>
      <option value="500">Mostrar 500</option>
      <option value="1000">Mostrar 1000</option>
    </select>
  );
}
