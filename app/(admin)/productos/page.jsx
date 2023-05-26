"use client";
import { useState } from "react";
import Link from "next/link";
import {
  CiruclePlusIcon,
  CloudArrowDownIcon,
  ListIcon,
} from "@/app/shared/CustomIcons";
import axios from "axios";

export default function ProductosPage() {
  const [userData, setUserData] = useState([
    {
      id_producto: 1,
      nombre: "Cama UNDER",
      descripcion: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus ratione fuga magni, doloribus dicta harum. Laboriosam laborum voluptatem, molestias vitae ipsam tempora quia animi nesciunt obcaecati optio iure! Ullam, expedita!",
      precio: "599.99",
      categoria: "Hombre",
      is_published: false,
      cantidad: 12,
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
          <ListIcon className={"w-5 fill-gray-400 text-blue-600"} />
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
            className="py-2 px-3 ring-1 shadow-md ring-blue-600 rounded-md flex bg-blue-600 text-gray-50 text-sm 
          hover:bg-blue-600 hover:text-gray-50 duration-200"
            href={"/productos/create"}
          >
            <CiruclePlusIcon
              className={"w-4 mr-2 fill-gray-50 text-blue-600"}
            />
            <p>Crear producto</p>
          </Link>
        </div>
      </div>
      {/* <TableProductos data={userData} /> */}
    </div>
  );
}
