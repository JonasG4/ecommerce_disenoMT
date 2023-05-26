"use client";
import { useState, useEffect } from "react";
import TitleForm from "@/components/forms/titleForm";
import Loading from "@/components/loading";
import axios from "axios";
import Link from "next/link";
import { FaceFrownIcon } from "@/app/shared/CustomIcons";
import moment from "moment";
import "moment/locale/es-mx";

export default function ViewPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [categoria, setCategoria] = useState({});
  const getCategoria = async () => {
    try {
      const { data } = await axios.get(`/api/categories/${codigo}`);
      setCategoria(data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  useEffect(() => {
    getCategoria();
  }, []);

  return (
    <div className="w-full p-5 flex flex-col gap-4 items-center">
      <section className="bg-gray-50 w-[650px] shadow-md rounded-md py-2 px-5">
        <TitleForm title="Información de la categoria" />
        <div className="h-[1px] w-full bg-gray-300 my-4"></div>
        {isLoading ? (
          <Loading />
        ) : (
          <div>
            {categoria ? (
              <div className="flex flex-col gap-2 w-full pb-2">
                <h1 className="uppercase text-lg text-gray-700 font-black flex items-center gap-2">
                  {categoria.nombre}{" "}
                  <span
                    className={`font-medium text-xs py-[2px] px-[10px] inline rounded-md text-gray-50 ${
                      categoria.is_active === 1 ? "bg-green-500" : " bg-red-600"
                    }`}
                  >
                    {categoria.is_active == 1 ? "Activa" : "Desactivada"}
                  </span>
                </h1>
                <div className="w-[100px] h-[1px] bg-blue-500 my-1"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex-col col-span-2 text-gray-700">
                    <p className="text-sm font-medium ">Descripcion</p>
                    <h4 className="text-sm font-light text-justify first-letter:uppercase">
                      {categoria.descripcion}
                    </h4>
                  </div>
                  <div className="flex-col text-gray-700">
                    <p className="text-sm font-medium">Fecha de creación</p>
                    <h4 className="font-light text-sm">
                      {formatDate(categoria.created_at)}
                    </h4>
                  </div>
                  <div className="flex-col text-gray-700">
                    <p className="text-sm font-medium">Fecha de modificación</p>
                    <h4 className="font-light text-sm">
                      {formatDate(categoria.updated_at)}
                    </h4>
                  </div>
                </div>
                <div className="w-[100px] h-[1px] bg-blue-500 my-1"></div>
                <div className="w-full flex flex-col gap-2 text-gray-700">
                  <h4 className="text-gray-900 font-medium">
                    Sub-categorias asociadas <span className="text-gray-500 font-normal text-sm">{`(${categoria.subcategories.length})`}</span>
                  </h4>
                  <ul className="w-full bg-gray-100 rounded-md ring-1 ring-gray-400 p-2 flex flex-wrap gap-2 items-center">
                    {categoria.subcategories.map((subcategoria, index) => (
                      <li
                        key={index}
                        className="py-1 px-2 bg-white ring-1 ring-gray-400 rounded-md text-sm text-gray-700 first-letter:uppercase "
                      >
                        {subcategoria.nombre}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex gap-4 mt-4">
                  <Link
                    href={`/categorias/${categoria.codigo}/edit?redirectFromDetails=true`}
                    className="py-[4px] text-gray-600 w-full rounded-md text-sm
                   flex items-center justify-center gap-2  ring-1 ring-gray-600 hover:ring-blue-500 hover:text-blue-500 group/btnedit"
                  >
                    <p>Editar</p>
                  </Link>
                  <Link
                    href={`/categorias/${categoria.codigo}/edit`}
                    className="py-[4px] bg-red-600 text-gray-50 w-full rounded-md 
                  flex items-center justify-center shadow-md ring-1 ring-red-400 hover:bg-red-500 text-sm gap-2 font-medium"
                  >
                    <p>Eliminar</p>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-5 gap-4">
                <FaceFrownIcon className={"w-12 fill-blue-500 text-blue-50"} />
                <p className="text-center text-gray-600 font-medium">
                  Este registro no existe o fue eliminado
                </p>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
}
