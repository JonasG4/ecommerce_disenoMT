"use client";
import { useState } from "react";
import Pagination from "../pagination";
import {
  SortIcon,
  FolderOpenIcon,
  SearchGlass,
} from "../../app/shared/CustomIcons";
import FilterBy from "../buttons/FilterBy";
import { paginate } from "../../utils/paginate";
import ChangePageSize from "../buttons/changePageSize";
import axios from "axios";
import Link from "next/link";

export default function TableCategorias({ data, setData }) {
  const [states, setStates] = useState({ activo: true, inactivo: true });
  const [search, setSearch] = useState("");

  const [sort, setSort] = useState({
    id_categoria: false,
    nombre: false,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleChangePageSize = (e) => {
    setPageSize(parseInt(e.target.value));
  };

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
    filterData(e.target.value);
  };

  const filterByState = (e) => {
    setStates({ ...states, [e.target.name]: e.target.checked });
  };

  const orderASC = (field) => {
    setData(
      data.sort((a, b) => {
        if (a[field].toLowerCase() < b[field].toLowerCase()) {
          return -1;
        }

        if (a[field].toLowerCase() > b[field].toLowerCase()) {
          return 1;
        }

        return 0;
      })
    );
  };

  const orderDESC = (field) => {
    setData(
      data.sort((a, b) => {
        if (a[field].toLowerCase() > b[field].toLowerCase()) {
          return -1;
        }

        if (a[field].toLowerCase() < b[field].toLowerCase()) {
          return 1;
        }

        return 0;
      })
    );
  };

  const orderBy = (field) => {
    if (sort[field]) {
      orderASC(field);
    } else {
      orderDESC(field);
    }
  };

  const OrderByID = () => {
    setData(
      data.sort((a, b) => {
        if (sort.id_categoria) {
          if (a.id_categoria > b.id_categoria) {
            return 1;
          }

          if (a.id_categoria < b.id_categoria) {
            return -1;
          }
        } else {
          if (a.id_categoria < b.id_categoria) {
            return 1;
          }

          if (a.id_categoria > b.id_categoria) {
            return -1;
          }
        }

        return 0;
      })
    );
  };

  const filterData = async (filter) => {
    await axios
      .post("/api/categories/find/", { filter: filter })
      .then((response) => {
        setData(response.data);
      });
  };

  const paginateCliente = paginate(data, currentPage, pageSize);
  return (
    <div className="relative shadow-md sm:rounded-md p-4 bg-gray-50 h-[91hv] overflow-hidden flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="search"
            value={search}
            onChange={handleChangeSearch}
            className="w-[350px] text-sm text-gray-600 pl-9 pr-2 rounded-md ring-1 bg-gray-100 ring-gray-400 border-none placeholder:text-sm"
            placeholder={"Buscar por nombre, apellido o correo..."}
          />
          <SearchGlass
            className={`w-4 absolute top-[10px] left-2 fill-gray-400`}
          />
        </div>{" "}
        <div className="flex items-center gap-4">
          <ChangePageSize onChangePageSize={handleChangePageSize} />
          <FilterBy changeStateFilter={filterByState} states={states} />
        </div>
      </div>
      <div className="w-full h-[1px] bg-gray-300"></div>
      {data.length > 0 ? (
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
                    className={`w-2 cursor-pointer select-none ${
                      sort.id_usuario
                        ? "fill-gray-700 text-gray-400"
                        : "fill-gray-400 text-gray-700"
                    }`}
                    onClick={() => {
                      setSort((prevState) => ({
                        ...prevState,
                        id_usuario: !sort.id_usuario,
                      }));
                      OrderByID();
                    }}
                  />
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  <div className="flex items-center gap-3">
                    <p>Nombre</p>
                    <SortIcon
                      className={`w-2 cursor-pointer select-none ${
                        sort.nombre
                          ? "fill-gray-700 text-gray-400"
                          : "fill-gray-400 text-gray-700"
                      }`}
                      onClick={() => {
                        setSort((prevState) => ({
                          ...prevState,
                          nombre: !sort.nombre,
                        }));

                        orderBy("nombre");
                      }}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  <div className="flex items-center gap-3">
                    <p>Descripcion</p>
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
                        {item.id_categoria}
                      </p>
                    </td>
                    <th
                      scope="row"
                      className="w-[350px] py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.nombre}
                    </th>
                    <td className="w-[350px] py-4 px-6">{item.descripcion}</td>
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
                        <Link
                          href={`/categorias/${item.id_categoria}`}
                          className="font-medium text-purple-600 dark:text-blue-500 hover:underline"
                        >
                          Revisar
                        </Link>
                        <div className="w-[1px] h-[20px] bg-gray-400"></div>
                        <Link
                          href={`/categorias/edit/${item.id_categoria}`}
                          className="font-medium text-purple-600 dark:text-blue-500 hover:underline"
                        >
                          Editar
                        </Link>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="w-full flex items-center flex-col gap-2 my-2">
          <FolderOpenIcon
            className={"w-[80px] fill-purple-400 text-purple-200"}
          />
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-medium text-gray-600">
              No se encontraron registros
            </h3>
            <p className="text-sm text-gray-500">
              Intenta quitar los filtros o agrega un nuevo registro
            </p>
          </div>
        </div>
      )}
      <Pagination
        items={data.length}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
