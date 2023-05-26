"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  InputText,
  InputSwitch,
  InputSelect,
  InputPasswordWithGenerator,
} from "@/components/forms/inputsForm";
import { FaceFrownIcon, EditPenIcon, KeyIcon } from "@/app/shared/CustomIcons";
import toast, { Toaster } from "react-hot-toast";
import Loading from "@/components/loading";
import formatPhoneNumber from "@/app/shared/formatingText";
import TitleForm from "@/components/forms/titleForm";
import Modal from "@/components/modals/modal";

export default function EditPage({ params }) {
  const id_usuario = params.id;
  const router = useRouter();

  //Validations
  const [isLoading, setLoading] = useState(true);
  const [isLoadingSubmit, setLoadingSubmit] = useState(false);
  const [isLoadingButton, setLoadingButton] = useState(false);
  const [isUserExist, setUserExist] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [validations, setValidations] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    hasPasswordError: false,
  });

  //Data
  const [user, updateUser] = useState({
    nombre: "",
    id_role: "",
    apellido: "",
    telefono: "",
    email: "",
    oldEmail: "",
    password: "",
    is_active: true,
  });
  const [roles, setRoles] = useState([]);

  const notify = (msg) =>
    toast.success(msg, {
      className: "bg-blue-700 text-gray-50",
    });

  const getUser = async () => {
    setLoading(true);
    await axios
      .get(`/api/users/${id_usuario}`)
      .then((response) => {
        updateUser({
          ...user,
          ...response.data,
          oldEmail: response.data.email,
        });
      })
      .catch((err) => {
        setUserExist(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getRoles = async () => {
    await axios.get("/api/users/roles").then((response) => {
      setRoles(response.data);
    });
  };

  useEffect(() => {
    getUser();
    getRoles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingSubmit(true);
    await axios
      .put(`/api/users/${id_usuario}`, { ...user })
      .then((response) => {
        if (response.status === 200) {
          router.push("/usuarios?showNotifyEdit=true");
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
      .finally(() => setLoadingSubmit(false));
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

  const handlePassword = (e) => {
    updateUser({ ...user, newPassword: e.target.value });
  };

  const handlerSubmitPassword = async () => {
    setLoadingButton(true);
    await axios
      .patch(`/api/users/${id_usuario}`, { newPassword: user.password })
      .then(() => {
        setIsOpen(false);
        updateUser({ ...user, password: "" });
        notify("Contraseña actualizada");
      })
      .catch((error) => {
        const { status, data } = error.response;
        if (status === 422) {
          setValidations({
            ...validations,
            hasPasswordError: data.messages.password.length > 0 ? true : false,
          });
        }
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  return (
    <div className="p-5 flex justify-center h-[650px]">
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"Cambiar contraseña"}
        width="600"
        height="300"
      >
        <InputPasswordWithGenerator
          label="Nueva contraseña"
          name="newPassword"
          password={user.password}
          setPassword={updateUser}
          onChange={handlePassword}
          hasError={validations.hasPasswordError}
        />
        <div className="h-[1px] w-full bg-gray-300 my-4"></div>
        <div className="flex gap-4">
          <button
            type="button"
            className="py-2 w-[185px] flex items-center justify-center ring-1 ring-gray-500 rounded-md text-gray-700 hover:ring-blue-500 hover:text-blue-500"
            onClick={handlerSubmitPassword}
          >
            {isLoadingButton ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="mr-2 w-4 h-4 text-gray-200 animate-spin fill-blue-500"
                >
                  <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
                </svg>
              </>
            ) : (
              "Actualizar contraseña"
            )}
          </button>
          <button
            type="button"
            className="py-2 px-4 bg-red-500 ring-1 ring-red-500 rounded-md text-gray-50 hover:bg-red-600"
            onClick={() => setIsOpen(false)}
          >
            Cerrar ventana
          </button>
        </div>
      </Modal>
      <div className="w-[650px] bg-gray-50 shadow-md rounded-md py-2 px-5">
        <TitleForm title="Editar usuario" route={"/usuarios"} />
        <div className="h-[1px] w-full bg-gray-300 my-4"></div>
        <div className="mt-4">
          <form
            className="flex flex-col gap-2 h-full"
            onSubmit={handleSubmit}
            autoComplete="off"
          >
            <div className="h-[430px]">
              {isLoading ? (
                <Loading />
              ) : (
                <>
                  {isUserExist ? (
                    <>
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
                      <div className="flex gap-4 mb-2 items-start w-[600px]">
                        <InputSelect
                          label="Rol"
                          field="id_role"
                          values={roles}
                          onChange={handleUser}
                          selected={user.role}
                        />
                        <InputSwitch
                          label="Estado"
                          name="is_active"
                          value={user.is_active}
                          onChange={handleUser}
                        />
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-col items-center py-5 gap-4">
                      <FaceFrownIcon
                        className={"w-12 fill-blue-500 text-blue-50"}
                      />
                      <p className="text-center text-gray-600 font-medium">
                        Este registro no existe o fue eliminado
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="h-[1px] w-full bg-gray-300 mt-4 mb-2"></div>
            <section className="w-full flex items-center gap-3 mb-4">
              <button
                className="w-[170px] bg-blue-500 rounded-md py-2 px-5 text-gray-100 text-sm font-medium flex ring-1 ring-blue-300
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
              <button
                type="button"
                className="p-2 ring-1 ring-gray-600 text-gray-600 rounded-md text-sm hover:ring-blue-500 hover:text-blue-500 flex gap-2 group/pass"
                onClick={() => setIsOpen(true)}
              >
                <KeyIcon className="w-4 fill-gray-600 group-hover/pass:fill-blue-500" />
                <p>Cambiar contraseña</p>
              </button>
            </section>
          </form>
        </div>
      </div>
    </div>
  );
}
