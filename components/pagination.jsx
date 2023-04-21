import React from "react";
import _ from "lodash";

export default function Pagination({
  items,
  pageSize,
  currentPage,
  onPageChange,
}) {
  const pageCount = items / pageSize;
  if (Math.ceil(pageCount) === 1) return null;
  const pages = _.range(1, pageCount + 1);
  
  const itemsCountInit = currentPage == 1 ? 1 : (pageSize * currentPage) - pageSize + 1
  const itemsCountEnd = currentPage * pageSize > items ? items : currentPage * pageSize

  return (
    <nav
      className="flex justify-between items-center pt-4"
      aria-label="Table navigation"
    >
      <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
        Mostrando{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {itemsCountInit} 
          - {itemsCountEnd}
          {" "}
        </span>
        de{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {items} 
        </span>
      </span>
      <ul className="inline-flex items-center -space-x-px">
        <li>
          <a
            href="#"
            className="block py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li key={page}>
              <a
                className={`py-2 px-3 cursor-pointer leading-tight ${
                  page === currentPage
                    ? "text-purple-600 bg-purple-50 border border-purple-300 hover:bg-purple-100 hover:text-purple-700 font-medium"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800  dark:text-gray-400"
                } dark:border-gray-700 dark:bg-gray-700 dark:text-white `}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          );
        })}
        <li>
          <a
            href="#"
            className="block py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
}
