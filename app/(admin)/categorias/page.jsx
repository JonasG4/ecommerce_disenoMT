"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
//utils
import {
  FolderOpenIcon,
  ArrowsRotateIcon,
  CloudArrowDownIcon,
} from "@/app/shared/CustomIcons";
//components
import TitleList from "@/components/list/titleList";
import Pagination from "@/components/list/pagination";
import { SortById, SortBy } from "@/components/list/sortIcon";
import FilterBy from "@/components/buttons/FilterBy";
import SearchInput from "@/components/list/searchInput";
import { paginate } from "@/utils/paginate";
import Loading from "@/components/loading";

export default function ListPage() {
  const [categories, setCategories] = useState([]);
  const [categoriesBU, setCategoriesBU] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const searchParms = useSearchParams();

  //Pagination
  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const notify = (msg) => {
    toast.success(msg, {
      className: "bg-blue-700 text-gray-50",
    });
  };

  const showNotify = () => {
    if (searchParms.get("showNotifyCreate")) {
      notify("¡Se ha creado exitosamente!");
    } else if (searchParms.get("showNotifyEdit")) {
      notify("¡Se ha editado exitosamente!");
    } else if (searchParms.get("showNotifyDelete")) {
      notify("¡Se ha eliminado exitosamente!");
    }
  };

  const getCategories = async () => {
    setLoading(true);
    await axios
      .get("/api/categories/list")
      .then((response) => {
        setCategories(response.data);
        setCategoriesBU(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlerChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    getCategories();
    showNotify();
  }, []);

  const categoriesList = paginate(categories, currentPage, pageSize);

  return (
    <div className="p-6 w-full flex flex-col max-h-[91vh] gap-4">
      <Toaster position="bottom-right" />
      <TitleList
        title={"Listado de categorías"}
        btnTitle={"Crear categoría"}
        btnLink={"/categorias/create"}
      />

      {/* ----------- TABLA CATEGORIAS ---------  */}
      <div className="relative shadow-md sm:rounded-md p-4 bg-gray-50 h-[91hv] overflow-hidden flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <SearchInput
            data={categoriesBU}
            setData={setCategories}
            placeholder={"Buscar por nombre"}
          />
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="bg-gray-100 py-[10px] w-12 rounded-md ring-1 ring-gray-400 flex items-center justify-center hover:ring-blue-400 group/peer"
              onClick={getCategories}
            >
              <ArrowsRotateIcon className="w-4 fill-gray-600 text-gray-600 group-hover/peer:fill-blue-600 group-hover/peer:text-blue-600 group-active/peer:rotate-[360deg] duration-300 ease-in-out" />
            </button>
            <button
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
            </button>
          </div>
        </div>
        <div className="w-full h-[1px] bg-gray-300"></div>
        <div className="overflow-auto scrollbar-thin scrollbar-thumb-blue-600 scrollbar-thumb-rounded-full scrollbar-track-gray-200">
          <table className="w-full min-h-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md relative">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0">
              <tr className="sticky top-0">
                <th scope="col" className="p-2 gap-2 sticky ">
                  <div className="flex items-center gap-2">
                    <SortById
                      field={"id_categoria"}
                      data={categories}
                      setData={setCategories}
                    />
                    <p>ID</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  <div className="flex items-center gap-2">
                    <SortBy
                      field={"nombre"}
                      data={categories}
                      setData={setCategories}
                    />
                    <p>Nombre</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  <div className="flex items-center gap-3">
                    <p>Descripción</p>
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  <div className="flex items-center gap-3">
                    <p>Estado</p>
                    <FilterBy
                      data={categoriesBU}
                      setData={setCategories}
                      filters={[
                        { is_active: 0, nombre: "Inactivo" },
                        { is_active: 1, nombre: "Activo" },
                      ]}
                      field={"is_active"}
                    />
                  </div>
                </th>
                <th scope="col" className="py-3 px-6 sticky">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="">
              {categoriesList.map((item, index) => {
                return (
                  <tr
                    key={index}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="w-14 py-[1px]">
                      <p className="bg-blue-500 rounded-md text-gray-50 text-[12px] flex items-center justify-center font-medium">
                        {item.id_categoria}
                      </p>
                    </td>
                    <td
                      scope="row"
                      className="w-[350px] py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white first-letter:uppercase"
                    >
                      {item.nombre}
                    </td>
                    <td className="w-[350px] py-4 px-6 first-letter:uppercase">
                      <p className="line-clamp-3 overflow-hidden text-justify">
                        {item.descripcion}
                      </p>
                    </td>
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
                          href={`/categorias/${item.codigo}`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Revisar
                        </Link>
                        <div className="w-[1px] h-[20px] bg-gray-400"></div>
                        <Link
                          href={`/categorias/${item.codigo}/edit`}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
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

          {categoriesList.length < 1 && (
            <>
              {isLoading ? (
                <Loading />
              ) : (
                <div className="w-full flex items-center flex-col gap-2 my-2">
                  <FolderOpenIcon
                    className={"w-[80px] fill-blue-400 text-blue-200"}
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
            </>
          )}
        </div>
        <Pagination
          items={categories?.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onChangePage={handlerChangePage}
        />
      </div>
    </div>
  );
}
