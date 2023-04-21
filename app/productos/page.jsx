"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CiruclePlusIcon,
  CloudArrowDownIcon,
  ListIcon,
} from "../shared/CustomIcons";
import axios from "axios";
import TableProductos from "../../components/tables/tableProductos";

export default function ProductosPage() {
  const [userData, setUserData] = useState([
    {
      id_producto: 1,
      imgUrl: "/public/prueba.jpg",
      nombre: "Camisa manga corta",
      descripcion: "",
      categoria: "Hombre",
      estado: "publicado",
    },
  ]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const {data : userData } = await axios.get(
  //         "/api/users/customer"
  //       );
  //       setUserData(userData)
  //       console.log(userData)
  //     } catch (error){

  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <div className="p-6 w-full flex flex-col max-h-[91vh] gap-4">
      <div className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-md shadow-md">
        <h1 className="text-xl font-black text-gray-700 flex items-center gap-3">
          <ListIcon className={"w-5 fill-gray-400 text-purple-600"} />
          <p>Listado de productos</p>
        </h1>
        <div className="flex items-center justify-center gap-4">
          <button
            className="py-2 px-3 ring-1 shadow-md ring-gray-300 rounded-md hover:bg-gray-200 bg-gray-100 text-gray-500 text-sm duration-200 flex items-center gap-2"
            href={"/clientes/create"}
          >
            <CloudArrowDownIcon className={"w-4 fill-gray-500 text-gray-50"} />
            <p>Expotar</p>
          </button>
          <Link
            className="py-2 px-3 ring-1 shadow-md ring-purple-600 rounded-md flex bg-purple-600 text-gray-50 text-sm 
          hover:bg-purple-600 hover:text-gray-50 duration-200"
            href={"/clientes/create"}
          >
            <CiruclePlusIcon
              className={"w-4 mr-2 fill-gray-50 text-purple-600"}
            />
            <p>Crear cliente</p>
          </Link>
        </div>
      </div>
      <TableProductos data={userData} />
    </div>
  );
}
