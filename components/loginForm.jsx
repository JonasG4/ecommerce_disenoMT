"use client";
import axios from "axios";
import { useState } from "react";
import { LockClosedIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import Image from "next/image";
import Logo from "../public/prueba4.png";

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    user: "",
    password: "",
    isSession: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [errorCredentials, setErrorCredentials] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isBtnLoading, setBtnLoading] = useState(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await axios
      .post("/api/auth/login", credentials)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        setErrorCredentials(true);
        setErrorMessage(error.response.data);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  const handleChange = (e) => {
    setErrorCredentials(false);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleIsSession = (e) => {
    setCredentials({
      ...credentials,
      isSession: e.target.checked,
    });
  };

  return (
    <div className="w-[400px] mx-auto bg-white ring-1 ring-slate-900/10 rounded-md p-6">
      <div>
        <Image
          src={Logo}
          alt="Logo de diseños MT"
          className="w-[200px] mx-auto"
        />
        <div className="w-[100px] h-[2px] bg-gray-300 mx-auto mt-6"></div>
        <h1 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Inicia sesión
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Debes autenticarte con usuario y contraseña para tener acceso a la
          sistema de administración
        </p>
      </div>
      <div
        className={`p-3 ring-1 ring-gray-300 rounded-md mt-6 flex gap-2 items-center bg-red-500 transition duration-150 ease-in-out ${
          errorCredentials ? "" : "hidden"
        }`}
      >
        <XCircleIcon className="w-5 h-5 text-white" />
        <p className="text-center text-white ">{errorMessage}</p>
      </div>
      <form action="" onSubmit={handleSubmit} className="mt-6 space-y-6">
        <input type="hidden" name="remember" defaultValue="true" />
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label htmlFor="email-address" className="sr-only">
              Usuario
            </label>
            <input
              id="user"
              name="user"
              type="text"
              autoComplete="user"
              required
              onChange={handleChange}
              className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              placeholder="Usuario"
            />
          </div>
          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type={passwordShown ? "text" : "password"}
              autoComplete="current-password"
              required
              onChange={handleChange}
              className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500 sm:text-sm"
              placeholder="Contraseña"
            />
            {passwordShown ? (
              <EyeIcon
                className="w-5 h-5 text-purple-500 absolute top-[10px] right-5 cursor-pointer z-50"
                onClick={togglePassword}
              />
            ) : (
              <EyeSlashIcon
                className="w-5 h-5 text-purple-500 absolute top-[10px] right-5 cursor-pointer z-50"
                onClick={togglePassword}
              />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="isSession"
              name="isSession"
              type="checkbox"
              onChange={handleIsSession}
              className="h-4 w-4 rounded-sm border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label
              htmlFor="isSession"
              className="ml-2 block text-sm text-gray-900"
            >
              Mantener sesión
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-purple-600 py-2 px-4 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <LockClosedIcon
              className="h-5 w-5 text-purple-500 group-hover:text-purple-400"
              aria-hidden="true"
            />
          </span>
          {isBtnLoading ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="mr-2 w-5 h-5 text-gray-200 animate-spin fill-white"
            >
              <path d="M222.7 32.1c5 16.9-4.6 34.8-21.5 39.8C121.8 95.6 64 169.1 64 256c0 106 86 192 192 192s192-86 192-192c0-86.9-57.8-160.4-137.1-184.1c-16.9-5-26.6-22.9-21.5-39.8s22.9-26.6 39.8-21.5C434.9 42.1 512 140 512 256c0 141.4-114.6 256-256 256S0 397.4 0 256C0 140 77.1 42.1 182.9 10.6c16.9-5 34.8 4.6 39.8 21.5z" />
            </svg>
          ) : (
            "Entrar"
          )}
        </button>
      </form>
    </div>
  );
}
