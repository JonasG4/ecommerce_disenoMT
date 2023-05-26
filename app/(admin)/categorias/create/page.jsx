"use client";
import axios from "axios";
import { useState } from "react";
import Link from "next/link";
import { AngleDown } from "@/app/shared/CustomIcons";
import { usePathname, useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
  InputBox,
} from "@/components/forms/inputsForm";
import toast, { Toaster } from "react-hot-toast";
import TitleForm from "@/components/forms/titleForm";

export default function CreatePage() {
  const [isLoadingData, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [items, updateItems] = useState([]);

  const [category, updateCategory] = useState({
    nombre: "",
    descripcion: "",
    is_active: true,
    subcategorias: [],
  });

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await axios
      .post("/api/categories/create", { ...category, subcategorias: items })
      .then((response) => {
        if (response.status === 201) {
          router.push("/categorias?showNotifyCreate=true");
        }
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            nombre: data.messages.nombre,
            descripcion: data.messages.descripcion,
          });
        }
      })
      .finally(() => setLoading(false));
  };

  const handleCategory = (e) => {
    const { name, value, type } = e.target;
    if (type == "checkbox") {
      updateCategory({ ...category, [name]: e.target.checked });
    } else {
      updateCategory({ ...category, [name]: value });
    }
  };

  return (
    <div className="p-5 flex justify-center">
      <Toaster position="bottom-right" />
      <div className="w-[700px] h-full bg-gray-50 shadow-md rounded-md py-2 px-5">
        <TitleForm title="Crear Categoria" />
        <div className="h-[1px] w-full bg-gray-300 my-2"></div>
        <div className="mt-4">
          <form
            className="flex flex-col gap-1"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <InputText
              label="Nombre"
              name="nombre"
              type="text"
              value={category.nombre}
              onChange={handleCategory}
              errMessage={validations.nombre}
            />
            <InputTextArea
              label="Descripcion"
              name="descripcion"
              value={category.descripcion}
              onChange={handleCategory}
              errMessage={validations.descripcion}
            />
            <InputBox updateData={updateItems} />
            <InputSwitch
              label={"Estado"}
              name={"is_active"}
              value={category.is_active}
              onChange={handleCategory}
            />
            <div className="h-[1px] w-full bg-gray-300 my-4"></div>
            <div className="w-full flex">
              <button
                className="w-auto bg-blue-500 mb-4 rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-blue-300
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
