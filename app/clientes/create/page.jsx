"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AngleDown, UserPlusIcon } from "../../shared/CustomIcons";
import { usePathname } from "next/navigation";
import {
  InputText,
  InputPasswordWithGenerator,
  InputSwitch,
} from "../../../components/forms/inputsForm";
import formatPhoneNumber from "../../shared/formatingText";
import { validationPassword, validationText } from "../../shared/validations";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePage() {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);

  const pathname = usePathname();
  const [user, updateUser] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
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
    
    const hasNombreError = validationText(user.nombre, "text").length > 0;
    const hasApellidoError = validationText(user.apellido, "text").length > 0;
    const hasEmailError = validationText(user.email, "email").length > 0;
    const hasTelefonoError = validationText(user.telefono, "tel").length > 0;
    const hasPasswordError = validationPassword(user.password).hasError;
    
    if (hasNombreError) {
      setValidations((prevState) => ({
        ...prevState,
        nombre: validationText(user.nombre, "text"),
      }));
    }

    if (hasApellidoError) {
      setValidations((prevState) => ({
        ...prevState,
        apellido: validationText(user.apellido, "text"),
      }));
    }

    if (hasEmailError) {
      setValidations((prevState) => ({
        ...prevState,
        email: validationText(user.email, "email"),
      }));
    }
    if (hasTelefonoError) {
      setValidations((prevState) => ({
        ...prevState,
        telefono: validationText(user.telefono, "tel"),
      }));
    }
    
    if (hasPasswordError) {
      setValidations((prevState) => ({
        ...prevState,
        hasPasswordError: validationPassword(user.password).hasError,
      }));
    }
    
    if (
      !hasNombreError &
      !hasApellidoError &
      !hasEmailError &
      !hasTelefonoError &
      !hasPasswordError
      ) {
      await axios
        .post("/api/users/create/", user)
        .then((response) => {
          router.push("/clientes?created=true");
        })
        .catch((error) => {
          console.log(error)
          if(error.response.status == 400){
            setValidations((prevState) => ({
              ...prevState,
              email: error.response.data.message,
            }));
          }
        })
        .finally(() => setLoadingData(false));
    } else {
      setLoadingData(false);
    }
  };

  const handleUser = (e) => {
    const inputName = e.target.name,
      inputValue = e.target.value,
      inputType = e.target.type;

    if (inputType == "checkbox") {
      updateUser((prevState) => ({
        ...prevState,
        [inputName]: e.target.checked,
      }));
    } else if (inputType == "tel") {
      updateUser((prevState) => ({
        ...prevState,
        [inputName]: formatPhoneNumber(inputValue),
      }));
    } else if (inputType == "email") {
      updateUser((prevState) => ({
        ...prevState,
        [inputName]: inputValue,
      }));
    } else {
      updateUser((prevState) => ({
        ...prevState,
        [inputName]: inputValue,
      }));
    }

    //validar
    setValidations((prevState) => ({
      ...prevState,
      [inputName]: validationText(inputValue, inputType),
    }));
  };

  return (
    <div className="p-5 flex justify-center">
      <div className="w-[700px] h-full bg-gray-50 shadow-md rounded-md py-2 px-5">
        <div className="flex items-center gap-3 mt-2 justify-between">
          <h1 className="font-black text-gray-700 text-xl">Nuevo cliente</h1>
          <Link
            href={pathname.split("/")[1]}
            className="flex flex-row items-center justify-center p-1 group/regresar"
          >
            <AngleDown
              className={
                "w-4 fill-purple-500 stroke-1 rotate-90 group-hover/regresar:fill-purple-700"
              }
            />
            <div className="text-purple-500 p-1 rounded-md group-hover/regresar:text-purple-700">
              Regresar
            </div>
          </Link>
        </div>
        <div className="h-[1px] w-full bg-gray-300 my-2"></div>
        <p className="text-sm text-gray-500">
          Los <b>clientes</b> utilizarán la página comercial para interactuar
          con los productos y realizar pedidos. Estos usuarios no tendrán{" "}
          <b>ningún tipo de acceso</b> al sistema de administración. Los
          asteriscos (*) indicán que el campo es requerido.
        </p>
        <div className="mt-4">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="flex gap-4">
              <InputText
                label="Nombre"
                name="nombre"
                type="text"
                value={user.nombre}
                onChange={handleUser}
                validation={{
                  error: validations.nombre,
                }}
              />
              <InputText
                label="Apellido"
                name="apellido"
                type="text"
                value={user.apellido}
                onChange={handleUser}
                validation={{
                  error: validations.apellido,
                }}
              />
            </div>
            <div className="flex gap-4">
              <InputText
                label="Teléfono"
                name="telefono"
                type="tel"
                value={user.telefono}
                onChange={handleUser}
                validation={{
                  error: validations.telefono,
                }}
              />
              <InputText
                label="Correo electrónico"
                name="email"
                type="email"
                value={user.email}
                onChange={handleUser}
                validation={{
                  error: validations.email,
                }}
              />
            </div>
            <div className="flex gap-4">
              <InputPasswordWithGenerator
                label="Contraseña"
                name="password"
                password={user.password}
                setPassword={updateUser}
                validation={validations.hasPasswordError}
                setValidation={setValidations}
                onChange={handleUser}
              />
              <div>
                <InputSwitch
                  label="Estado"
                  name="is_active"
                  value={user.is_active}
                  onChange={handleUser}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="bg-purple-500 my-4 rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-purple-300
                gap-2 items-center justify-center hover:bg-purple-600 hover:ring-purple-400 ease-in duration-150"
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
