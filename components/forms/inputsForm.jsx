"use client";
import { useState, useEffect } from "react";
import {
  CircleExlacmationIcon,
  CopyIcon,
  CheckIcon,
  CircleCheckIcon,
  CircleXmarkIcon,
  CloudArrowUpIcon,
  ImagesIcon,
} from "@/app/shared/CustomIcons";
import { validationText, validationPassword } from "@/app/shared/validations";
import Loading from "@/components/loading";

export function InputText({
  label,
  name,
  type,
  value,
  onChange,
  allowNull,
  errMessage,
}) {
  let [validation, setValidation] = useState();

  useEffect(() => {
    setValidation(errMessage);
  }, [errMessage]);

  const handlerChange = (e) => {
    const { value } = e.target;
    onChange(e);
    setValidation(validationText(value, type));
  };

  return (
    <div className="flex flex-col gap-2 max-w-[600px]">
      <label htmlFor={label} className="text-sm text-gray-600 font-semibold">
        {label}{" "}
        <span className={`${allowNull ? "hidden" : ""} text-red-500`}>*</span>
      </label>
      <div className="flex flex-col relative pb-6">
        <input
          className={`rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm
                     placeholder:text-gray-500  ${
                       validation?.length > 0
                         ? "focus:ring-red-500 ring-red-500 text-red-500"
                         : "focus:ring-blue-600"
                     } `}
          type={type}
          name={name}
          value={value}
          placeholder={label}
          onChange={handlerChange}
        />
        <p className="absolute bottom-0 text-sm text-red-500 mt-1">
          {validation?.length > 0 ? validation : ""}
        </p>
        <CircleExlacmationIcon
          className={`${
            validation?.length > 0 ? "" : "hidden"
          } fill-red-500 w-5 absolute right-2 top-2`}
        />
      </div>
    </div>
  );
}

export function InputTextArea({
  label,
  name,
  value,
  onChange,
  allowNull,
  errMessage,
}) {
  let [validation, setValidation] = useState();

  useEffect(() => {
    setValidation(errMessage);
  }, [errMessage]);

  const handlerChange = (e) => {
    const { value } = e.target;
    onChange(e);
    setValidation(validationText(value, "text"));
  };

  return (
    <div className="flex flex-col gap-2 max-w-[600px]">
      <label htmlFor={label} className="text-sm text-gray-600 font-semibold">
        {label}{" "}
        <span className={`${allowNull ? "hidden" : ""} text-red-500`}>*</span>
      </label>
      <div className="flex flex-col relative pb-6">
        <textarea
          value={value}
          name={name}
          onChange={handlerChange}
          placeholder={label}
          rows={4}
          className={`rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm

                     placeholder:text-gray-500 ${
                       validation?.length > 0
                         ? "focus:ring-red-500 ring-red-500 text-red-500"
                         : "focus:ring-blue-600"
                     } `}
        ></textarea>
        <p className="absolute -bottom-0 text-sm text-red-500 mt-1">
          {validation?.length > 0 ? validation : ""}
        </p>
      </div>
    </div>
  );
}

export function InputSelect({ label, field, values, onChange, selected }) {
  return (
    <div className="flex flex-col gap-2 w-[600px]">
      <label htmlFor="" className="text-sm text-gray-600 font-semibold">
        {label}
      </label>
      <select
        name={field}
        className="bg-white shadow-sm rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm
                     text-gray-700 cursor-pointer hover:ring-blue-600"
        onChange={onChange}
      >
        {values.length === 0 && <option>Cargando...</option>}
        {values.map((value, index) => {
          return (
            <option
              key={index}
              value={value[field]}
              className="absolute cursor-pointer"
              selected={selected === value["nombre"]}
            >
              {value.nombre}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export function InputSwitch({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-sm text-gray-600 font-semibold">
        {label}
      </label>
      <label className="relative w-[90px] inline-flex items-center cursor-pointer h-full select-none">
        <input
          type="checkbox"
          className="sr-only peer peer/label"
          name={name}
          defaultChecked={value}
          onChange={onChange}
        />
        <div
          className="w-[90px] h-[30px] bg-gray-200 rounded-md peer dark:bg-gray-700 ring-1
                   ring-gray-400 peer-checked:after:translate-x-[65px] peer-checked:after:border-white after:content-[''] 
                   after:absolute after:top-[3px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:shadow-sm
                   after:rounded-md after:h-[24px] after:w-5 after:z-50 after:transition-all dark:border-gray-600
                  peer-checked:bg-green-600 "
        ></div>
        <span className="absolute ml-2 text-sm font-medium text-gray-100 dark:text-gray-300 select-none hidden peer-checked/label:block">
          Activo
        </span>
        <span className="absolute right-2 text-sm font-medium text-gray-500 dark:text-gray-300 select-none peer-checked/label:hidden">
          Inactivo
        </span>
      </label>
    </div>
  );
}

export function InputPasswordWithGenerator({
  label,
  name,
  password,
  setPassword,
  onChange,
  hasError = false,
}) {
  const [passwordType, setPasswordType] = useState("password");
  const [isActive, setIsActive] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [requeriments, setRequeriments] = useState({
    hasError: false,
    hasUpper: false,
    hasLower: false,
    hasNumber: false,
    minLength: 8,
  });

  function generateRandomString() {
    let chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let newPassword = "";

    for (let i = 0; i < 15; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    let passwordValidation = validationPassword(newPassword);

    setPassword((prevState) => ({
      ...prevState,
      password: newPassword,
    }));

    setRequeriments(passwordValidation);
  }

  function showPassword(e) {
    if (passwordType == "password") {
      setPasswordType("text");
      e.target.innerText = "Ocultar";
    } else {
      setPasswordType("password");
      e.target.innerText = "Mostrar";
    }
  }

  function copyToClipboard() {
    setIsActive(true);
    navigator.clipboard.writeText(password);

    setTimeout(() => {
      setIsActive(false);
    }, 2000);
  }

  function handleChange(e) {
    onChange(e);
    setPassword((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));

    let passwordValidation = validationPassword(e.target.value);
    setRequeriments(passwordValidation);
    console.log(passwordValidation);
  }

  useEffect(() => {
    setRequeriments({
      ...requeriments,
      hasError: hasError,
    });

    if (hasError) setShowValidation(true);
  }, [hasError]);

  return (
    <div className="relative flex flex-col gap-2 max-w-[600px]">
      <label htmlFor="" className="text-sm text-gray-600 font-semibold">
        {label} <span className={`text-red-500`}>*</span>
      </label>
      <div className="flex">
        <div
          onClick={generateRandomString}
          className="w-[100px] flex items-center select-none justify-center cursor-pointer hover:bg-blue-200 active:scale-95  duration-150 hover:ring-blue-600 z-50 rounded-l-md px-4 bg-gray-200 text-sm font-semibold text-gray-700 ring-1 ring-gray-400"
        >
          Generar
        </div>
        <input
          className={`w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm placeholder:text-gray-500 ${
            requeriments.hasError
              ? "focus:ring-red-500 ring-red-500 text-red-500 z-50"
              : "focus:ring-blue-600"
          } focus:z-50`}
          type={passwordType}
          name={name}
          placeholder={label}
          value={password}
          onChange={handleChange}
          onFocus={() => {
            setShowValidation(true);
          }}
          onBlur={() => {
            setShowValidation(false);
          }}
        />
        <div
          className={`relative min-h-full w-12 px-3 flex items-center justify-center ring-1 ${
            isActive ? "ring-green-500 z-50" : "ring-gray-300 z-0"
          } bg-gray-100 cursor-pointer hover:bg-gray-200 duration-100 ease-in`}
          onClick={copyToClipboard}
        >
          {isActive ? (
            <CheckIcon className={"w-4 fill-green-500"} />
          ) : (
            <CopyIcon className={"w-4 fill-gray-400 text-gray-500"} />
          )}

          {isActive && (
            <div
              className="absolute w-[60px] h-7 bg-gray-800 text-gray-100 text-[12px] flex justify-center items-center rounded-md -top-8
            after:content-[''] after:w-0 after:h-0 after:absolute after:-bottom-[10px]
            after:border-b-[5px] after:border-b-transparent
            after:border-l-[5px] after:border-l-transparent
            after:border-r-[5px] after:border-r-transparent
            after:border-t-[5px] after:border-t-gray-800"
            >
              Copiado
            </div>
          )}
        </div>
        <div
          onClick={(e) => showPassword(e)}
          className="w-[100px] z-40 flex items-center select-none justify-center cursor-pointer hover:bg-blue-200 active:scale-95  duration-150 hover:ring-blue-600  rounded-r-md px-4 bg-gray-200 text-sm font-semibold text-gray-700 ring-1 ring-gray-400"
        >
          Mostrar
        </div>
      </div>
      {showValidation && requeriments.hasError && (
        <div
          className={`absolute top-[80px] left-[150px] w-[230px] h-[160px] bg-blue-50 
            rounded-md flex flex-col items-center ring-1 ring-blue-500 shadow-lg
            after:content-[''] after:w-0 after:h-0 after:absolute after:-top-[14px]
            after:border-t-[7px] after:border-t-transparent
            after:border-l-[7px] after:border-l-transparent
            after:border-r-[7px] after:border-r-transparent
            after:border-b-[7px] after:border-b-blue-500`}
        >
          <div className="text-sm w-full flex flex-col items-center">
            <h5 className="font-medium w-full text-blue-50 py-2 bg-blue-500 rounded-t-md text-center">
              Tu contraseña debe contener
            </h5>
            <ul className="mt-2 flex flex-col gap-2">
              <li className="flex gap-2 items-center text-gray-700">
                {requeriments.hasUpper ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Al menos una mayúscula</p>
              </li>
              <li className="flex gap-2 items-center text-gray-700">
                {requeriments.hasLower ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Al menos una minúscula</p>
              </li>

              <li className="flex gap-2 items-center text-gray-700">
                {requeriments.hasNumber ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Al menos un número</p>
              </li>
              <li className="flex gap-2 items-center text-gray-700">
                {password.length >= requeriments.minLength ? (
                  <CircleCheckIcon
                    className={"w-4 fill-green-500 text-green-50"}
                  />
                ) : (
                  <CircleXmarkIcon
                    className={"w-4 fill-red-500 text-green-50"}
                  />
                )}
                <p>Mínimo 8 carácteres</p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export function InputMultiFile({}) {
  const [images, setImages] = useState([]);

  return (
    <article className="w-full flex flex-col gap-4">
      <section className="bg-blue-100 rounded-md border-dashed border-2 border-gray-400 p-5 flex flex-col justify-center items-center gap-1">
        <CloudArrowUpIcon className={"fill-blue-400 text-blue-50"} width={50} />
        <p className="text-center font-semibold text-gray-600 text">
          Arrastra y suelta las imagenes
        </p>
        <p className="text-center font-light text-gray-600">o</p>
        <input type="file" multiple accept="images/*" className="hidden" />
        <button type="button" className="font-medium text-blue-600 rounded-md">
          Subir desde mi pc
        </button>
      </section>

      <section className="ring-1 ring-gray-400 rounded-md p-2">
        <h2 className="font-semibold text-gray-700">Imagenes seleccionadas</h2>
        <div className="h-[100px]">
          {images.length > 0 ? (
            <di></di>
          ) : (
            <div className="flex flex-col justify-center items-center gap-2">
              <ImagesIcon
                width={60}
                className={"fill-gray-300 text-gray-500"}
              />
              <p className="text-gray-500">No se han seleccionado archivos</p>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}

export function InputBox({ data = [], updateData, limit = 10 }) {
  const [isFocus, setFocus] = useState(false);
  const [items, updateItems] = useState([]);
  const [isItemExist, setItemExist] = useState(false);

  useEffect(() => {
    if (data.length > 0) {
      updateItems(data);
    }
  }, []);

  const handleItems = (event) => {
    if (event.code == "Enter") {
      event.preventDefault();
    }
    setItemExist(false);
    const { value } = event.target;

    if (event.code == "Enter" && value.trim() != "") {
      const checkDuplicate = items.find(
        (item) => item.toLowerCase() == value.trim().toLowerCase()
      );

      if (checkDuplicate) {
        setItemExist(checkDuplicate);
        return;
      }

      updateItems([...items, value.trim()]);
      updateData([...items, value.trim()]);
      event.target.value = "";
    }
  };

  const deleteItem = (index) => {
    const newItems = items.filter((item, i) => i != index);
    updateItems(newItems);
    updateData(newItems);
  };

  return (
    <div className="w-[600px] flex flex-col gap-2 mb-3">
      <div>
        <label htmlFor="" className="text-sm text-gray-600 font-bold">
          Sub-Categorias{" "}
          <span className={`font-normal ${items.length >= limit ? "text-blue-500" : "text-gray-400"} `}>
            {`( ${items.length} / ${limit} )`}
          </span>
          {isItemExist && (
            <span className="ml-2  text-red-500 font-light">
              ¡Esa categoria ya fue agregada!
            </span>
          )}
        </label>
      <p className="text-xs text-gray-400">
        Escribe la sub-categoria y presiona la tecla{" "}
        <span className="font-bold text-gray-500">Enter</span> para agregarla a
        la lista.
      </p>
      </div>
      <ul
        className={`w-full bg-white rounded-md ring-1 flex flex-wrap gap-2 items-center focus:ring-blue-500 py-2 pl-2 pr-1 ${
          isFocus ? "ring-blue-500" : "ring-gray-300"
        } ${isItemExist && "ring-red-500"}`}
      >
        {items?.map((item, index) => (
          <li
            key={index}
            className="py-1 px-2 bg-gray-50 ring-1 ring-gray-300 hover:ring-blue-500 hover:text-blue-500 text-sm text-gray-600 rounded-md flex gap-1 items-center"
          >
            <p>{item}</p>
            <CircleXmarkIcon
              className="w-3 h-3 fill-gray-300 text-gray-100 cursor-pointer hover:fill-red-500"
              onClick={() => deleteItem(index)}
            />
          </li>
        ))}
        <input
          type="text"
          className="w-full flex-1 border-none focus:ring-0 text-sm"
          onKeyDown={handleItems}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          placeholder={items.length >= limit ? "" : "+ Agregar nueva"}
          disabled={items.length >= limit}
        />
      </ul>
    </div>
  );
}
