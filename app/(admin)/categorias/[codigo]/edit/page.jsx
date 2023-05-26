"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaceFrownIcon, EditPenIcon } from "@/app/shared/CustomIcons";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputTextArea,
  InputSwitch,
  InputBox,
} from "@/components/forms/inputsForm";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/loading";
import TitleForm from "@/components/forms/titleForm";

export default function EditPage({ params: { codigo } }) {
  const [isLoading, setLoading] = useState(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [isCategoryExist, setCategoryExist] = useState(true);
  const router = useRouter();

  const [category, updateCategory] = useState({
    id_categoria: "",
    nombre: "",
    descripcion: "",
    is_active: true,
    subcategorias: [],
  });
  const [subcategorias, updateSubcategorias] = useState([]);

  const [validations, setValidations] = useState({
    nombre: "",
    descripcion: "",
  });

  const getCategory = async () => {
    setLoading(true);
    await axios
      .get(`/api/categories/${codigo}`)
      .then((response) => {
        const subcategoriasList = response.data.subcategories.map(
          (sub) => sub.nombre
        );
        updateSubcategorias(subcategoriasList);
        updateCategory({
          id_categoria: response.data.id_categoria,
          nombre: response.data.nombre,
          descripcion: response.data.descripcion,
          is_active: response.data.is_active,
          subcategorias: response.data.subcategories,
        });
      })
      .catch((err) => {
        setCategoryExist(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getCategory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    await axios
      .put(`/api/categories/${codigo}`, {
        ...category,
        newSubcategorias: subcategorias,
      })
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
      .finally(() => setLoadingSubmit(false));
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
        <TitleForm title={"Editar categoria"} />
        <div className="h-[1px] w-full bg-gray-300 my-2"></div>

        {/* ---------------- FORM----------- */}
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isCategoryExist ? (
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
                  <InputBox
                    data={subcategorias}
                    updateData={updateSubcategorias}
                  />
                  <InputSwitch
                    label={"Estado"}
                    name={"is_active"}
                    value={category.is_active}
                    onChange={handleCategory}
                  />
                  <div className="h-[1px] w-full bg-gray-300 my-2"></div>
                  <div className="w-full flex">
                    <button
                      className="w-[170px] bg-blue-500 mb-4 rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-blue-300
                            gap-2 items-center justify-center hover:bg-blue-600 hover:ring-blue-400 ease-in duration-150"
                      type="submit"
                    >
                      {isLoadingSubmit ? (
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
                          <EditPenIcon
                            className={`w-4 fill-gray-100 text-gray-100`}
                          />
                          <span>Actualizar datos</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center py-5 gap-4">
                <FaceFrownIcon className={"w-12 fill-blue-500 text-blue-50"} />
                <p className="text-center text-gray-600 font-medium">
                  Este registro no existe o fue eliminado
                </p>
              </div>
            )}
          </>
        )}
        {/* ---------------- FORM----------- */}
      </div>
    </div>
  );
}
