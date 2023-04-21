"use client";
import Link from "next/link";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "../../../../components/forms/inputsForm";
import {
  AngleDown,
  FaceFrownIcon,
  EditPenIcon,
} from "../../../shared/CustomIcons";
import { usePathname } from "next/navigation";
import { Toaster } from "react-hot-toast";
import Loading from "../../../../components/loading";
import formatPhoneNumber from "../../../shared/formatingText";
import { validationText } from "../../../shared/validations";

export default function CustomerPage({ params }) {
  const id_usuario = params.id;
  const pathname = usePathname();
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [isUserExist, setUserExist] = useState(true);
  const [user, updateUser] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    is_active: true,
  });
  const [oldEmail, updateEmail] = useState("");
  const [validations, setValidations] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
  });

  const getUser = async () => {
    setLoading(true);
    await axios
      .get(`/api/users/${id_usuario}`)
      .then((response) => {
        updateUser(response.data);
        updateEmail(response.data.email);
      })
      .catch((err) => {
        setUserExist(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasNombreError = validationText(user.nombre, "text").length > 0;
    const hasApellidoError = validationText(user.apellido, "text").length > 0;
    const hasEmailError = validationText(user.email, "email").length > 0;
    const hasTelefonoError = validationText(user.telefono, "tel").length > 0;

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

    if (
      !hasNombreError &&
      !hasApellidoError &&
      !hasEmailError &&
      !hasTelefonoError
    ) {
      setLoadingSubmit(true);
      await axios
        .put("/api/users/update", {...user, oldEmail: oldEmail})
        .then((response) => {
          router.push("/clientes?edited=true");
        })
        .catch((error) => {
          setValidations((prevState) => ({
            ...prevState,
            email: error.response.data.message,
          }));
        })
        .finally(() => {
          setLoadingSubmit(false);
        });
    }
  };

  const handleUser = (e) => {
    const inputName = e.target.name,
      inputValue = e.target.value,
      inputType = e.target.type;

    if (inputType == "checkbox") {
      updateUser((prevState) => ({
        ...prevState,
        [inputName]: inputValue,
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
      <Toaster position="bottom-right" />
      <div className="w-[700px] h-full bg-gray-50 shadow-md rounded-md py-2 px-5">
        <div className="flex items-center gap-3 justify-between">
          <h1 className="font-black text-gray-700 text-md">Editar cliente</h1>
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

        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isUserExist ? (
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
                  <div className="flex gap-4 mb-2">
                    {/* <InputPasswordWithGenerator
                            label={user.password.label}
                            name={user.password.name}
                            password={user.password.value}
                            setPassword={setUser}
                            validation={user.password.hasError}
                            onChange={handleUser}
                          /> */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor=""
                        className="text-sm text-gray-600 font-semibold"
                      >
                        Estado
                      </label>
                      <label className="relative inline-flex items-center cursor-pointer h-full select-none">
                        <input
                          type="checkbox"
                          className="sr-only peer peer/label"
                          name="is_active"
                          defaultChecked={user.is_active}
                          onChange={handleUser}
                        />
                        <div
                          className="w-[90px] h-[36px] bg-gray-200 rounded-md peer dark:bg-gray-700 ring-1
                               ring-gray-400 peer-checked:after:translate-x-[65px] peer-checked:after:border-white after:content-[''] 
                               after:absolute after:top-[3px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:shadow-sm
                               after:rounded-md after:h-[30px] after:w-5 after:z-50 after:transition-all dark:border-gray-600
                              peer-checked:bg-green-600 "
                        ></div>
                        <span className="absolute ml-2 text-sm font-medium text-gray-100 dark:text-gray-300 select-none hidden peer-checked/label:block">
                          Activo
                        </span>
                        <span className="absolute right-2 text-sm font-medium text-gray-400 dark:text-gray-300 select-none peer-checked/label:hidden">
                          Inactivo
                        </span>
                      </label>
                    </div>
                  </div>
                  <div className="w-full flex">
                    <button
                      className="w-[170px] bg-purple-500 my-4 rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-purple-300
                            gap-2 items-center justify-center hover:bg-purple-600 hover:ring-purple-400 ease-in duration-150"
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
                <FaceFrownIcon
                  className={"w-12 fill-purple-500 text-purple-50"}
                />
                <p className="text-center text-gray-600 font-medium">
                  Este registro no existe o fue eliminado
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
