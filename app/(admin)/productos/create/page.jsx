"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AngleDown, UserPlusIcon } from "@/app/shared/CustomIcons";
import { usePathname } from "next/navigation";
import {
  InputText,
  InputSwitch,
  InputTextArea,
  InputMultiFile
} from "@/components/forms/inputsForm";
import { validationPassword, validationText } from "@/app/shared/validations";

export default function CreatePage() {
  const router = useRouter();
  const [isLoadingData, setLoadingData] = useState(false);

  const pathname = usePathname();
  const [product, updateProduct] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    marcaId: "",
    categoriaId: "",
    stock: "",
    is_published: true,
  });

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data: categoriesData } = await axios.get("/api/categories/list");
    setCategories(categoriesData);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    marcaId: "",
    categoriaId: "",
    stock: "",
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
          console.log(error);
          if (error.response.status == 400) {
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

  const handleProduct = (e) => {
    const inputName = e.target.name,
      inputValue = e.target.value,
      inputType = e.target.type;

    if (inputType == "checkbox") {
      updateProduct((prevState) => ({
        ...prevState,
        [inputName]: e.target.checked,
      }));
    } else {
      updateProduct((prevState) => ({
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
    <div className="p-5 flex justify-center overflow-scrollr">
      <div className="w-[700px] h-full bg-gray-50 shadow-md rounded-md py-2 px-5">
        <div className="flex items-center gap-3 mt-2 justify-between">
          <h1 className="font-black text-gray-700 text-xl">Nuevo producto</h1>
          <Link
            href={pathname.split("/")[1]}
            className="flex flex-row items-center justify-center p-1 group/regresar"
          >
            <AngleDown
              className={
                "w-4 fill-blue-500 stroke-1 rotate-90 group-hover/regresar:fill-blue-700"
              }
            />
            <div className="text-blue-500 p-1 rounded-md group-hover/regresar:text-blue-700">
              Regresar
            </div>
          </Link>
        </div>
        <div className="h-[1px] w-full bg-gray-300 my-2"></div>
        <div className="mt-4">
          <form
            className="flex flex-col gap-2"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="grid grid-cols-2 gap-4">
              <InputText
                label="Nombre"
                name="nombre"
                type="text"
                value={product.nombre}
                onChange={handleProduct}
                validation={{
                  error: validations.nombre,
                }}
              />
              <div className="flex flex-col gap-2 w-full">
                <label
                  htmlFor="id_categorias"
                  className="text-sm text-gray-600 font-semibold"
                >
                  Categorias <span className={`text-red-500`}>*</span>
                </label>
                <div className="flex flex-col relative pb-6">
                  <select
                    name="id_categoria"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full px-3 py-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option selected disabled className="placeholder:text-gray-400 text-gray-400"> --- SELECCIONA UNA CATEGORIA --- </option>
                    {categories.map((category, index) => {
                      return (
                        <option key={index} value={category.id_categoria}>
                          {category.nombre}
                        </option>
                      );
                    })}
                  </select>
                  <p className="absolute -bottom-4 text-sm text-red-500 mt-1">
                    {validations.id_categoria !== ""
                      ? validations.id_categoria
                      : ""}
                  </p>
                </div>
              </div>
            </div>
            <InputMultiFile />
            <InputTextArea
              label="Descripcion"
              name="descripcion"
              value={product.descripcion}
              onChange={handleProduct}
              validation={{
                error: validations.descripcion,
              }}
            />
            <div className="flex gap-4">
              <InputText
                label="Precio"
                name="precio"
                type="number"
                value={product.precio}
                onChange={handleProduct}
                validation={{
                  error: validations.precio,
                }}
              />
            </div>
            <div className="flex gap-4">
              <div>
                <InputSwitch
                  label="Estado"
                  name="is_published"
                  value={product.is_published}
                  onChange={handleProduct}
                />
              </div>
            </div>
            <div className="w-full flex justify-end">
              <button
                className="bg-blue-500 my-4 rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-blue-300
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
