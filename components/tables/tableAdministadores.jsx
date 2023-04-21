"use client";
import { useState } from "react";
import Pagination from "../pagination";
import { SortIcon } from "../../app/shared/CustomIcons";
import SearchInTable from "../searchInTable";
import FilterBy from "../buttons/FilterBy";
import { paginate } from "../../utils/paginate";
import ChangePageSize from "../buttons/changePageSize";

export default function TableAdministadores({ data }) {
  const [states, setStates] = useState({ activo: true, inactivo: true });

  const [sortById, setSortById] = useState(true);
  const [sortByName, setSortByName] = useState(true);
  const [sortByLastname, setSortByLastname] = useState(true);
  const [sortByEmail, setSortByEmail] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  const filterByState = (e) => {
    setStates({ ...states, [e.target.name]: e.target.checked });
    console.log(states)
  };

  const paginateCliente = paginate(data, currentPage, pageSize);
  return (
    <div className="relative shadow-md sm:rounded-md p-4 bg-gray-50 h-[91hv] overflow-hidden flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <SearchInTable label={"Buscar administrador"} />
        <div className="flex items-center gap-4">
          <ChangePageSize onChangePageSize={handleChangePageSize} />
          <FilterBy changeStateFilter={filterByState} states={states}/>
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>
      <div className="overflow-auto scrollbar-thin scrollbar-thumb-purple-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
        <table className="w-full min-h-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md relative">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
            <tr className="sticky top-0">
              <th
                scope="col"
                className="p-2 font-bold flex items-center gap-3 sticky "
              >
                <p>ID</p>
                <SortIcon
                  className={`w-2 cursor-pointer ${
                    sortById
                      ? "fill-gray-700 text-gray-400"
                      : "fill-gray-400 text-gray-700"
                  }`}
                  onClick={() => setSortById(!sortById)}
                />
              </th>
              <th scope="col" className="py-3 px-6 sticky">
                <div className="flex items-center gap-3">
                  <p>Nombre</p>
                  <SortIcon
                    className={`w-2 cursor-pointer ${
                      sortByName
                        ? "fill-gray-700 text-gray-400"
                        : "fill-gray-400 text-gray-700"
                    }`}
                    onClick={() => setSortByName(!sortByName)}
                  />
                </div>
              </th>
              <th scope="col" className="py-3 px-6 sticky">
                <div className="flex items-center gap-3">
                  <p>Apellido</p>
                  <SortIcon
                    className={`w-2 cursor-pointer ${
                      sortByLastname
                        ? "fill-gray-700 text-gray-400"
                        : "fill-gray-400 text-gray-700"
                    }`}
                    onClick={() => setSortByLastname(!sortByLastname)}
                  />
                </div>
              </th>
              <th scope="col" className="py-3 px-6 sticky">
                <div className="flex items-center gap-3">
                  <p>Correo</p>
                  <SortIcon
                    className={`w-2 cursor-pointer ${
                      sortByEmail
                        ? "fill-gray-700 text-gray-400"
                        : "fill-gray-400 text-gray-700"
                    }`}
                    onClick={() => setSortByEmail(!sortByEmail)}
                  />
                </div>
              </th>
              <th scope="col" className="py-3 px-6 sticky">
                <div className="flex items-center gap-3">
                  <p>Estado</p>
                </div>
              </th>
              <th scope="col" className="py-3 px-6 sticky">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="">
            {paginateCliente.map((item, index) => {
              return (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="w-14 py-[1px]">
                    <p className="bg-purple-500 rounded-md text-gray-50 text-[12px] flex items-center justify-center font-medium">
                      {item.id_usuario}
                    </p>
                  </td>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {item.nombre}
                  </th>
                  <td className="py-4 px-6">{item.apellido}</td>
                  <td className="py-4 px-6">{item.email}</td>
                  <td className="py-4 px-6">
                    {item.is_active == 1 ? (
                      <p className="text-gray-50 text-[12px] py-[1px] w-14 text-center bg-green-600 rounded-md inline-block mx-auto font-medium">
                        Activo
                      </p>
                    ) : (
                      <p className="text-gray-50 text-[12px] py-[1px] w-14 text-center bg-red-600 rounded-md inline-block mx-auto font-medium">
                        Inactivo
                      </p>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-3">
                      <a
                        href="#"
                        className="font-medium text-purple-600 dark:text-blue-500 hover:underline"
                      >
                        Revisar
                      </a>
                      <div className="w-[1px] h-[20px] bg-gray-400"></div>
                      <a
                        href="#"
                        className="font-medium text-purple-600 dark:text-blue-500 hover:underline"
                      >
                        Editar
                      </a>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        items={data.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
