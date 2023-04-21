"use client";
import { useEffect, useState } from "react";
import TableClientes from "../../components/tables/tableClientes";
import Link from "next/link";
import {
  CiruclePlusIcon,
  CloudArrowDownIcon,
  ListIcon,
} from "../shared/CustomIcons";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function ClientesPage() {
  const [userData, setUserData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const searchParms = useSearchParams();

  const notify = (msg) => toast.success(msg, {
    className: "bg-purple-700 text-gray-50",

  });

  const fetchData = async () => {
    setLoading(true);
    await axios
      .get("/api/users/list")
      .then((response) => {
        setUserData(response.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const showNotify = () => {
    if (searchParms.get("created")) {
      notify("¡Se ha creado exitosamente!");
    } else if (searchParms.get("edited")) {
      notify("¡Se ha editado exitosamente!");
    } else if (searchParms.get("deleted")) {
      notify("¡Se ha eliminado exitosamente!");
    }
  };

  useEffect(() => {
    fetchData();
    showNotify();
  }, []);

  return (
    <div className="p-6 w-full flex flex-col max-h-[91vh] gap-4">
      <Toaster position="bottom-right" />
      <div className="flex items-center justify-between gap-4 bg-gray-50 p-4 rounded-md shadow-md">
        <h1 className="text-lg font-black text-gray-700 flex items-center gap-3">
          <ListIcon className={"w-5 fill-gray-400 text-purple-600"} />
          <p>Listado de clientes</p>
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
      <TableClientes
        data={userData}
        setData={setUserData}
        isLoading={isLoading}
      />
    </div>
  );
}
