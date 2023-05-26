"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserPlusIcon } from "@/app/shared/CustomIcons";
import {
  InputText,
  InputPasswordWithGenerator,
  InputSwitch,
  InputSelect,
} from "@/components/forms/inputsForm";
import formatPhoneNumber from "@/app/shared/formatingText";
import TitleForm from "@/components/forms/titleForm";

export default function CreatePage() {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    await axios
      .get("/api/users/roles")
      .then((response) => {
        setRoles(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getRoles();
  }, []);

  const [user, updateUser] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    id_role: 1,
    password: "",
    is_active: true,
  });

  const [validations, setValidations] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    hasPasswordError: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingData(true);
    await axios
      .post("/api/users/create/", user)
      .then((response) => {
        if (response.status === 201) {
          router.push("/usuarios?showNotifyCreate=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.messages.nombre,
            apellido: data.messages.apellido,
            telefono: data.messages.telefono,
            email: data.messages.email,
            hasPasswordError: data.messages.password.length > 0 ? true : false,
          });
        }
      })
      .finally(() => setLoadingData(false));
  };

  const handleUser = (e) => {
    const { name, value, type } = e.target;

    if (type == "checkbox") {
      updateUser({ ...user, [name]: e.target.checked });
    } else if (type == "tel") {
      updateUser({ ...user, [name]: formatPhoneNumber(value) });
    } else {
      updateUser({ ...user, [name]: value });
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-auto h-full bg-gray-50 shadow-md rounded-md py-2 px-5">
        <TitleForm title="Crear usuario" route={"/usuarios"} />
        <div className="h-[1px] w-full bg-gray-300 my-4"></div>
        <div className="mt-4">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <InputText
              label="Nombre"
              name="nombre"
              type="text"
              value={user.nombre}
              onChange={handleUser}
              errMessage={validations.nombre}
            />
            <InputText
              label="Apellido"
              name="apellido"
              type="text"
              value={user.apellido}
              onChange={handleUser}
              errMessage={validations.apellido}
            />
            <InputText
              label="Teléfono"
              name="telefono"
              type="tel"
              value={user.telefono}
              onChange={handleUser}
              errMessage={validations.telefono}
            />
            <InputText
              label="Correo electrónico"
              name="email"
              type="email"
              value={user.email}
              onChange={handleUser}
              errMessage={validations.email}
            />
            <InputPasswordWithGenerator
              label="Contraseña"
              name="password"
              password={user.password}
              setPassword={updateUser}
              hasError={validations.hasPasswordError}
              onChange={handleUser}
            />
            <div className="flex w-[600px] justify-between items-center gap-[100px]">
              <InputSelect
                label="Rol"
                field="id_role"
                values={roles}
                onChange={handleUser}
                selected={user.id_role}
              />
              <InputSwitch
                label="Estado"
                name="is_active"
                value={user.is_active}
                onChange={handleUser}
              />
            </div>
            <div className="h-[1px] w-full bg-gray-300 mt-4 mb-2"></div>
            <div className="w-full flex mb-4">
              <button
                className="bg-blue-500  rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-blue-300
                gap-2 items-center justify-center hover:bg-blue-600 hover:ring-blue-400 ease-in duration-150"
                type="submit"
              >
                {isLoadingData ? (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="mr-2 w-4 h-4 text-gray-200 animate-spin fill-white"
                    >
                      <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                    </svg>
                    <span>Cargando...</span>
                  </>
                ) : (
                  <>
                    <UserPlusIcon
                      className={`w-4 fill-gray-100 text-gray-100`}
                    />
                    <span>Crear cliente</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
