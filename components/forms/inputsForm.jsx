"use client";
import { useState } from "react";
import {
  CircleExlacmationIcon,
  CopyIcon,
  CheckIcon,
  CircleCheckIcon,
  CircleXmarkIcon,
} from "../../app/shared/CustomIcons";

import { validationPassword } from "../../app/shared/validations";

export function InputText({
  label,
  name,
  type,
  value,
  onChange,
  allowNull,
  validation,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label} className="text-sm text-gray-600 font-semibold">
        {label}{" "}
        <span className={`${allowNull ? "hidden" : ""} text-red-500`}>*</span>
      </label>
      <div className="flex flex-col relative pb-6">
        <input
          className={`rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm
                     placeholder:text-gray-500  ${
                       validation.error.length > 0
                         ? "focus:ring-red-500 ring-red-500 text-red-500"
                         : "focus:ring-purple-600"
                     } `}
          type={type}
          name={name}
          value={value}
          placeholder={label}
          onChange={onChange}
        />
        <p className="absolute bottom-0 text-sm text-red-500 mt-1">
          {validation.error.length > 0 ? validation.error : ""}
        </p>
        <CircleExlacmationIcon
          className={`${
            validation.error.length > 0 ? "" : "hidden"
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
  validation,
  onChange,
  allowNull,
}) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label htmlFor={label} className="text-sm text-gray-600 font-semibold">
        {label}{" "}
        <span className={`${allowNull ? "hidden" : ""} text-red-500`}>*</span>
      </label>
      <div className="relative">
        <textarea
          value={value}
          name={name}
          onChange={onChange}
          className={`rounded-md w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm
                     placeholder:text-gray-500 ${
                       validation.error.length > 0
                         ? "focus:ring-red-500 ring-red-500 text-red-500"
                         : "focus:ring-purple-600"
                     } `}
        ></textarea>
        <p className="absolute -bottom-4 text-sm text-red-500 mt-1">
          {validation.error.length > 0 ? validation.error : ""}
        </p>
      </div>
    </div>
  );
}

export function InputSwitch({ label, name, value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="" className="text-sm text-gray-600 font-semibold">
        {label}
      </label>
      <label className="relative inline-flex items-center cursor-pointer h-full select-none">
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
  validation,
  setValidation,
}) {
  const [passwordType, setPasswordType] = useState("password");
  const [isActive, setIsActive] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [requeriments, setRequeriments] = useState({
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
    setValidation((prevState) => ({
      ...prevState,
      hasPasswordError: passwordValidation.hasError,
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

  function onChangeEvt(e) {
    let passwordValidation = validationPassword(e.target.value);
    onChange(e);
    setPassword((prevState) => ({
      ...prevState,
      password: e.target.value,
    }));
    setValidation((prevState) => ({
      ...prevState,
      hasPasswordError: passwordValidation.hasError,
    }));
    setRequeriments(passwordValidation);
  }

  return (
    <div className="relative flex flex-col gap-2 w-full">
      <label htmlFor="" className="text-sm text-gray-600 font-semibold">
        {label} <span className={`text-red-500`}>*</span>
      </label>
      <div className="flex">
        <div
          onClick={generateRandomString}
          className="w-[100px] flex items-center select-none justify-center cursor-pointer hover:bg-purple-200 active:scale-95  duration-150 hover:ring-purple-600 z-50 rounded-l-md px-4 bg-gray-200 text-sm font-semibold text-gray-700 ring-1 ring-gray-400"
        >
          Generar
        </div>
        <input
          className={`w-full px-3 py-2 ring-1 ring-gray-300 border-none text-sm placeholder:text-gray-500 ${
            validation
              ? "focus:ring-red-500 ring-red-500 text-red-500 z-50"
              : "focus:ring-purple-600"
          } focus:z-50`}
          type={passwordType}
          name={name}
          placeholder={label}
          value={password}
          onChange={(e) => {
            onChangeEvt(e);
          }}
          onFocus={() => {
            setShowValidation(true);
          }}
          onBlur={() => {
            setShowValidation(false);
          }}
        />
        <div
          className={`relative h-full w-12 px-3 flex items-center justify-center ring-1 ${
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
          className="w-[100px] z-40 flex items-center select-none justify-center cursor-pointer hover:bg-purple-200 active:scale-95  duration-150 hover:ring-purple-600  rounded-r-md px-4 bg-gray-200 text-sm font-semibold text-gray-700 ring-1 ring-gray-400"
        >
          Mostrar
        </div>
      </div>
      {showValidation && validation && (
        <div
          className={`absolute top-[80px] left-[150px] w-[230px] h-[160px] bg-purple-200 
            rounded-md flex flex-col items-center ring-1 ring-purple-500 shadow-lg
            after:content-[''] after:w-0 after:h-0 after:absolute after:-top-[14px]
            after:border-t-[7px] after:border-t-transparent
            after:border-l-[7px] after:border-l-transparent
            after:border-r-[7px] after:border-r-transparent
            after:border-b-[7px] after:border-b-purple-500`}
        >
          <div className="text-sm w-full flex flex-col items-center">
            <h5 className="font-medium w-full text-purple-100 py-2 bg-purple-500 rounded-t-md text-center">
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
