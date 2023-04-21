"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { AngleDown, UserPlusIcon } from "../../shared/CustomIcons";
import { usePathname, useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
} from "../../../components/forms/inputsForm";
import { validationText } from "../../shared/validations";
import toast, { Toaster } from "react-hot-toast";

export default function CreatePage() {
  const [isLoadingData, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [category, updateCategory] = useState({
    nombre: "",
    descripcion: "",
    is_active: true,
  });

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const hasNombreError = validationText(category.nombre, "text").length > 0;
    const hasDescripcionError =
      validationText(category.descripcion, "text").length > 0;

    if (hasNombreError) {
      setValidations((prevState) => ({
        ...prevState,
        nombre: validationText(category.nombre, "text"),
      }));
    }

    if (hasDescripcionError) {
      setValidations((prevState) => ({
        ...prevState,
        descripcion: validationText(category.descripcion, "text"),
      }));
    }

    if (!hasNombreError && !hasDescripcionError) {
      await axios
        .post("/api/categories/create", category)
        .then((response) => router.push("/categorias?created=true"))
        .catch((error) => {})
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  };

  const handleCategory = (e) => {
    const inputName = e.target.name,
      inputValue = e.target.value,
      inputType = e.target.type;

    if (inputType == "checkbox") {
      updateCategory((prevState) => ({
        ...prevState,
        [inputName]: e.target.checked,
      }));
    } else {
      updateCategory((prevState) => ({
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
      <Toaster position="bottom-right" />
      <div className="w-[700px] h-full bg-gray-50 shadow-md rounded-md py-2 px-5">
        <div className="flex items-center gap-3 justify-between">
          <h1 className="font-black text-gray-700 text-md">Crear categoria</h1>
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
            <InputText
              label="Nombre"
              name="nombre"
              type="text"
              value={category.nombre}
              onChange={handleCategory}
              validation={{
                error: validations.nombre,
              }}
            />
            <InputTextArea
              label="Descripcion"
              name="descripcion"
              value={category.descripcion}
              onChange={handleCategory}
              validation={{
                error: validations.descripcion,
              }}
            />
            <div className="mt-3">
              <InputSwitch
                label={"Estado"}
                name={"is_active"}
                value={category.is_active}
                onChange={handleCategory}
              />
            </div>
            <div className="w-full flex justify-end">
              <button
                className="w-auto bg-purple-500 my-4 rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-purple-300
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
                    <span>Crear categoria</span>
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
