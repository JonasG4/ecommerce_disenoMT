"use client";
import { useEffect, useState, useRef } from "react";
import { AngleDown, FilterListIcon } from "../../app/shared/CustomIcons";

export default function FilterBy({ changeStateFilter, states }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const isClickOutside = (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", isClickOutside);
    return () => {
      document.removeEventListener("click", isClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative ">
      <button
        className="text-gray-600 bg-gray-100 ring-1 ring-gray-300 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-purple-300 rounded-md text-sm px-4 py-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FilterListIcon className={"w-3 mr-2 fill-gray-400 text-gray-500"} />
        Estado
        <AngleDown className="ml-2 w-3 h-3 fill-gray-500" />
      </button>

      {isOpen && (
        <div
          className="absolute right-0 z-10 w-40 ring-1 ring-gray-300 bg-white rounded shadow-lg dark:bg-gray-700 top-11"
          ref={ref}
        >
          {/* <div className="p-3">
            <label htmlFor="input-group-search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="input-group-search"
                className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search user"
              />
            </div>
          </div> */}
          <h4 className="text-sm px-4 py-2 font-semibold text-gray-700">
            Filtrar por Estado:
          </h4>
          <ul className="overflow-y-auto px-5 pb-3 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  defaultChecked={states.activo}
                  id="checkbox-item-11"
                  type="checkbox"
                  name="activo"
                  onChange={(e) => changeStateFilter(e)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-11"
                  className="py-2 ml-2 w-full text-sm text-gray-500 rounded dark:text-gray-300"
                >
                  Activo
                </label>
              </div>
            </li>
            <li>
              <div className="flex items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                <input
                  defaultChecked={states.inactivo}
                  id="checkbox-item-12"
                  type="checkbox"
                  name="inactivo"
                  onChange={(e) => changeStateFilter(e)}
                  className="w-4 h-4 text-purple-600 bg-gray-100 rounded border-gray-300 focus:ring-purple-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                />
                <label
                  htmlFor="checkbox-item-12"
                  className="py-2 ml-2 w-full text-sm text-gray-500 rounded dark:text-gray-300"
                >
                  Inactivo
                </label>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
