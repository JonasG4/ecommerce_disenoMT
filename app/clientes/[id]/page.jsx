"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import {
  AngleDown,
  EditPenIcon,
  TrashCanIcon,
  FaceFrownIcon,
} from "../../shared/CustomIcons";
import moment from "moment";
import "moment/locale/es-mx";
import Loading from "../../../components/loading";

export default function CustomerPage({ params }) {
  const id_usuario = params.id;
  const [user, updateUser] = useState({});
  const [isUserExist, setUserExist] = useState({ state: true, msg: "" });
  const [isLoading, setLoading] = useState(true);

  const pathname = usePathname();

  const formatDate = (date) => {
    return moment(date).format("LL");
  };

  const getUser = async () => {
    setLoading(true);
    await axios
      .get(`/api/users/${id_usuario}`)
      .then((response) => {
        updateUser(response.data);
      })
      .catch((err) => {
        setUserExist({
          state: false,
          msg: err.response.data,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const typeSignin = (user) => {
    if (user.is_google === 1) {
      return "Google";
    } else if (user.is_facebook === 1) {
      return "Facebook";
    } else {
      return "Correo y contraseña";
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="w-full p-5 flex flex-col gap-4 items-center">
      <div className="bg-gray-50 w-[650px] shadow-md rounded-md py-2 px-5">
        <div className="flex items-center gap-3 justify-between">
          <h1 className="font-black text-gray-700 text-md">
            Detalles del cliente
          </h1>
          <Link
            href={pathname.split("/")[1]}
            className="flex flex-row items-center justify-center p-1 group/regresar"
          >
            <AngleDown
              className={
                "w-3 fill-purple-500 stroke-1 rotate-90 group-hover/regresar:fill-purple-700"
              }
            />
            <div className="text-purple-500 text-sm p-1 rounded-md group-hover/regresar:text-purple-700">
              Regresar
            </div>
          </Link>
        </div>
        <div className="h-[1px] w-full bg-gray-300 mb-2"></div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isUserExist.state ? (
              <div className="flex gap-8 w-full py-2 items-center">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-center w-[150px] h-[150px] bg-purple-50 rounded-md ring-1 ring-purple-600 ">
                    <Image
                      src={"/images/users/default.png"}
                      alt="Foto de perfil"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="w-full flex gap-2">
                    <Link
                      href={`/clientes/edit/${user.id_usuario}`}
                      className="py-[6px] bg-purple-600 text-gray-50 w-1/2 rounded-md
                   flex items-center justify-center shadow-md ring-1 ring-purple-400 hover:bg-purple-700"
                    >
                      <EditPenIcon
                        className={"w-3 fill-gray-50 text-gray-50 "}
                      />
                    </Link>
                    <Link
                      href={`/clientes/delete/${user.id_usuario}`}
                      className="py-[6px] bg-red-600 text-gray-50 w-1/2 rounded-md 
                  flex items-center justify-center shadow-md ring-1 ring-red-400 hover:bg-red-700"
                    >
                      <TrashCanIcon
                        className={"w-3 fill-gray-50 text-gray-50-2"}
                      />
                    </Link>
                  </div>
                </div>
                <div className="grid gap-5 grid-cols-2 py-2 w-3/4">
                  <div className="flex-col">
                    <p className="text-sm font-light">Nombre completo</p>
                    <h4 className="font-medium text-sm">
                      {user.nombre} {user.apellido}
                    </h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Número de teléfono</p>
                    <h4 className="font-medium text-sm">{user.telefono}</h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Correo electrónico</p>
                    <h4 className="font-medium text-sm">{user.email}</h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Se registró con</p>
                    <h4 className="font-medium text-sm">{typeSignin(user)}</h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Fecha de creación</p>
                    <h4 className="font-medium text-sm">
                      {formatDate(user.created_at)}
                    </h4>
                  </div>
                  <div className="flex-col">
                    <p className="text-sm font-light">Estado de la cuenta</p>
                    <h4
                      className={`font-medium text-sm py-[2px] px-[10px]  inline rounded-md text-gray-50 ${
                        user.is_active === 1 ? "bg-green-500" : " bg-red-600"
                      }`}
                    >
                      {user.is_active == 1 ? "Activa" : "Desactivada"}
                    </h4>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center py-5 gap-4">
                <FaceFrownIcon className={"w-12 fill-purple-500 text-purple-50"} />
                <p className="text-center text-gray-600 font-medium">
                  Este registro no existe o fue eliminado
                </p>
              </div>
            )}
          </>
        )}
      </div>
      <div className="bg-gray-50 w-[650px] shadow-md rounded-md py-2 px-5">
        <div className="flex items-center gap-3 justify-between">
          <h1 className="font-black text-gray-700 text-md">
            Pedidos del cliente
          </h1>
        </div>
        <div className="h-[1px] w-full bg-gray-300 mb-2"></div>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="py-2">
            <p className="text-center text-gray-500">
              Aún no ha realizado pedidos
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
