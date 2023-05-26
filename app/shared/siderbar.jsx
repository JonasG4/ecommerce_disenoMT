"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  UserGroupIcon,
  BarsIcon,
  CarShoppingIcon,
  BagsShoppingIcon,
  MoneyBillIcon,
  GearIcon,
  DashboardIcon,
  UsersGearIcon,
  ShapesIcon,
  TagIcon,
  CircleInfoIcon,
} from "./CustomIcons";

export default function Siderbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = {
    Dashboard: { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    Usuarios: { name: "Usuarios", path: "/usuarios", icon: UserGroupIcon },
    Roles: { name: "Roles", path: "/roles", icon: UsersGearIcon },
    Productos: {
      name: "Productos",
      path: "/productos",
      icon: BagsShoppingIcon,
    },
    Categorias: { name: "Categorias", path: "/categorias", icon: ShapesIcon },
    Marcas: { name: "Marcas", path: "/marcas", icon: TagIcon },
    Pedidos: { name: "Pedidos", path: "/pedidos", icon: CarShoppingIcon },
    Transacciones: {
      name: "Transacciones",
      path: "/transacciones",
      icon: MoneyBillIcon,
    },
    Configuraciones: {
      name: "Configuraciones",
      path: "/configuraciones",
      icon: GearIcon,
    },
    Ayuda: { name: "Ayuda", path: "/ayuda", icon: CircleInfoIcon },
  };

  const showSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className={`${
        isOpen ? "min-w-[220px] max-w-[220px]" : "min-w-[80px] max-w-[80px]"
      } min-h-screen block bg-gray-50 border-r-2 border-gray-300 shadow-lg transition-all ease-in-out duration-200`}
    >
      <div className="h-[70px] border-b-[1px] border-gray-300 p-3 flex justify-around w-full">
        <Image
          src={'/images/logotipo.png'}
          alt="Logo de Eben-Ezer"
          className={`${isOpen ? "" : "hidden"}`}
          height={50}
          width={140}
          priority
        />
        <BarsIcon
          className="fill-gray-700 text-gray-700 cursor-pointer hover:scale-105"
          onClick={showSideBar}
          width={16}
        />
      </div>
      <ul className="flex flex-col gap-1 px-4 mt-5">
        {/* ======================= ANALITICA ================== */}
        <div className="h-4 mt-3 flex flex-col justify-center">
          {isOpen ? (
            <p className="text-sm text-gray-600 font-semibold">
              Análisis
            </p>
          ) : (
            <div className="h-[1px] w-full bg-gray-300"></div>
          )}
        </div>
        {/* ======================= DASHBOARD ================== */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Dashboard.path)
                ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Dashboard.path}
          >
            <menuItems.Dashboard.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Dashboard.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Dashboard.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Dashboard.name}
              </div>
            )}
          </Link>
        </li>
        {/* ======================= ADMINISTRACION ================== */}
        <div className="h-4 mt-3 flex flex-col justify-center">
          {isOpen ? (
            <p className="text-sm text-gray-600 font-semibold">
              Administración
            </p>
          ) : (
            <div className="h-[1px] w-full bg-gray-300"></div>
          )}
        </div>
        {/* ***************** USUARIOS ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Usuarios.path)
                ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Usuarios.path}
          >
            <menuItems.Usuarios.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Usuarios.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Usuarios.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Usuarios.name}
              </div>
            )}
          </Link>
        </li>

        {/* ***************** ROLES ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Roles.path)
                ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Roles.path}
          >
            <menuItems.Roles.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Roles.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Roles.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Roles.name}
              </div>
            )}
          </Link>
        </li>

        {/* ======================= INVENTARIO ================== */}
        <div className="h-4 mt-3 flex flex-col justify-center">
          {isOpen ? (
            <p className="text-sm text-gray-600 font-semibold">Inventario</p>
          ) : (
            <div className="h-[1px] w-full bg-gray-300"></div>
          )}
        </div>
        {/* ***************** Productos ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Productos.path)
              ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Productos.path}
          >
            <menuItems.Productos.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Productos.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Productos.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Productos.name}
              </div>
            )}
          </Link>
        </li>

        {/* ***************** Categorias ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Categorias.path)
              ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Categorias.path}
          >
            <menuItems.Categorias.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Categorias.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Categorias.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Categorias.name}
              </div>
            )}
          </Link>
        </li>

        {/* ***************** Marcas ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Marcas.path)
              ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Marcas.path}
          >
            <menuItems.Marcas.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Marcas.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Marcas.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Marcas.name}
              </div>
            )}
          </Link>
        </li>

        {/* ======================= VENTA ================== */}
        <div className="h-4 mt-3 flex flex-col justify-center">
          {isOpen ? (
            <p className="text-sm text-gray-600 font-semibold">Ventas</p>
          ) : (
            <div className="h-[1px] w-full bg-gray-300"></div>
          )}
        </div>
        {/* ***************** Pedidos ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Pedidos.path)
              ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Pedidos.path}
          >
            <menuItems.Pedidos.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Pedidos.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Pedidos.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Pedidos.name}
              </div>
            )}
          </Link>
        </li>

        {/* ***************** Transacciones ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Transacciones.path)
              ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Transacciones.path}
          >
            <menuItems.Transacciones.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Transacciones.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Transacciones.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Transacciones.name}
              </div>
            )}
          </Link>
        </li>

        {/* ======================= SPORTE ================== */}
        <div className="h-4 mt-3 flex flex-col justify-center">
          {isOpen ? (
            <p className="text-sm text-gray-600 font-semibold">Soporte</p>
          ) : (
            <div className="h-[1px] w-full bg-gray-300"></div>
          )}
        </div>
        {/* ***************** Configuraciones ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Configuraciones.path)
              ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Configuraciones.path}
          >
            <menuItems.Configuraciones.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Configuraciones.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Configuraciones.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Configuraciones.name}
              </div>
            )}
          </Link>
        </li>

        {/* ***************** Ayuda ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Ayuda.path)
              ? "text-blue-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Ayuda.path}
          >
            <menuItems.Ayuda.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Ayuda.path)
                  ? "fill-blue-600 text-blue-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Ayuda.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Ayuda.name}
              </div>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}
