"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LogoAdmin from "../../public/prueba4.png";
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
} from "./CustomIcons";

export default function Siderbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = {
    Dashboard: { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
    Clientes: { name: "Clientes", path: "/clientes", icon: UserGroupIcon },
    Administradores: {
      name: "Administradores",
      path: "/administradores",
      icon: UsersGearIcon,
    },
    Productos: {
      name: "Productos",
      path: "/productos",
      icon: BagsShoppingIcon,
    },
    Categorias: { name: "Categorias", path: "/categorias", icon: ShapesIcon },
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
          src={LogoAdmin}
          alt="Logo de DiseñosMT"
          className={`${isOpen ? "" : "hidden"}`}
          width={140}
        />
        <BarsIcon
          className="fill-gray-700 text-gray-700 cursor-pointer hover:scale-105"
          onClick={showSideBar}
          width={16}
        />
        
      </div>
      <ul className="flex flex-col gap-1 px-4 mt-5">
        
        {/* ======================= DASHBOARD ================== */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Dashboard.path)
                ? "font-bold outline-purple-400"
                : "font-regular"
            } flex items-center gap-4 transition-all ease-in duration-200 text-gray-100 bg-purple-600 hover:font-semibold outline outline-[2px] hover:outline-purple-400`}
            href={menuItems.Dashboard.path}
          >
            <menuItems.Dashboard.icon
              className={`w-4 absolute fill-gray-100`}
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
        {/* ======================= USUARIOS ================== */}
        <div className="h-4 mt-3 flex flex-col justify-center">
          {isOpen ? (
            <p className="text-sm text-gray-600 font-semibold">Usuarios</p>
          ) : (
            <div className="h-[2px] w-full bg-gray-200"></div>
          )}
        </div>
        {/* ***************** Clientes ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname.includes(menuItems.Clientes.path)
                ? "text-purple-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Clientes.path}
          >
            <menuItems.Clientes.icon
              className={`w-4 absolute ${
                pathname.includes(menuItems.Clientes.path)
                  ? "fill-purple-600 text-purple-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Clientes.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Clientes.name}
              </div>
            )}
          </Link>
        </li>

        {/* ***************** Administradores ******************* */}
        <li>
          <Link
            className={`group relative w-full px-4 h-[34px] rounded-md text-sm ${
              pathname === menuItems.Administradores.path
                ? "text-purple-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Administradores.path}
          >
            <menuItems.Administradores.icon
              className={`w-4 absolute ${
                pathname === menuItems.Administradores.path
                  ? "fill-purple-600 text-purple-600"
                  : "fill-gray-400 text-gray-400 "
              }`}
              width={16}
            />
            <p className={`absolute left-12 ${isOpen ? "" : "hidden"}`}>
              {menuItems.Administradores.name}
            </p>
            {!isOpen && (
              <div
                id="tooltip-right"
                role="tooltip"
                className="inline-block absolute invisible z-10 py-2 px-3 left-[80px] top-1 text-sm font-medium text-gray-700 bg-gray-200 rounded-md shadow-sm dark:bg-gray-100 group-hover:visible ring-1 ring-gray-400"
              >
                {menuItems.Administradores.name}
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
              pathname === menuItems.Productos.path
                ? "text-purple-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Productos.path}
          >
            <menuItems.Productos.icon
              className={`w-4 absolute ${
                pathname === menuItems.Productos.path
                  ? "fill-purple-600 text-purple-600"
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
              pathname === menuItems.Categorias.path
                ? "text-purple-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Categorias.path}
          >
            <menuItems.Categorias.icon
              className={`w-4 absolute ${
                pathname === menuItems.Categorias.path
                  ? "fill-purple-600 text-purple-600"
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
              pathname === menuItems.Pedidos.path
                ? "text-purple-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Pedidos.path}
          >
            <menuItems.Pedidos.icon
              className={`w-4 absolute ${
                pathname === menuItems.Pedidos.path
                  ? "fill-purple-600 text-purple-600"
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
              pathname === menuItems.Transacciones.path
                ? "text-purple-600 bg-gray-200 font-bold"
                : "text-gray-600 font-regular"
            } flex items-center gap-4 transition-all ease-in-out duration-300  hover:bg-gray-200`}
            href={menuItems.Transacciones.path}
          >
            <menuItems.Transacciones.icon
              className={`w-4 absolute ${
                pathname === menuItems.Transacciones.path
                  ? "fill-purple-600 text-purple-600"
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
      </ul>
    </div>
  );
}
