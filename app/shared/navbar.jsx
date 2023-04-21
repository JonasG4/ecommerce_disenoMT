import React from "react";
import { SearchGlass, UserIcon } from "./CustomIcons";
import Notificacion from "../../components/notification";
import BtnClearList from "../../components/buttons/btnClearList";
import moment from "moment";
import "moment/locale/es";
import ItemList from "../../components/buttons/itemList";
import UserButton from "../../components/userButton";

let data = [
  {
    name: "Jonas Garcia",
    date: "12/19/2022 02:20:55",
    isSeen: true,
  },
  {
    name: "Jefferson López",
    date: "12/19/2022, 9:20:55",
    isSeen: false,
  },
  {
    name: "Horny Reyes",
    date: "12/15/2022, 02:20:55",
    isSeen: false,
  },
];

export default function Navbar() {
  function getNow(date) {
    moment.locale("es");
    return moment(date).fromNow();
  }

  const onChangeStatus = () =>{

  }

  return (
    <header className="w-full h-[70px] bg-gray-50 shadow-md border-b-[1px] border-gray-400 flex items-center px-8">
      <nav className="flex items-center w-full">
        <div className="relative flex items-center">
          <input
            type="search"
            placeholder="Buscar"
            className="movile:max-w-[120px] sm:max-w-[350px] border-none outline-none pl-11 rounded-md bg-slate-100 ring-1 ring-gray-300 focus:ring-purple-500 font-semibold placeholder:font-semibold shadow-md text-gray-700 text-sm"
          />
          <SearchGlass className="w-4 absolute fill-gray-400 left-3" />
        </div>
        <div className="ml-auto flex gap-5 items-center">
          <Notificacion>
            <div className="flex flex-col gap-2 px-5 py-3 rounded-md w-[350px] bg-gray-50 shadow-lg ring-1 ring-gray-300 absolute -right-3 top-[3rem] z-50">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-gray-800">
                  Notificaciones
                </h4>
                <BtnClearList data={data} />
              </div>
              <ul className="flex flex-col gap-2 mt-1">
                {data.length == 0 && (
                  <li className="w-full h-[75px] rounded-md bg-gray-100 py-2 px-3 ring-1 ring-gray-200 flex items-center justify-center">
                    <h2 className="text-sm font-semibold text-gray-800">
                      No hay notificaciones nuevas
                    </h2>
                  </li>
                )}
                {data.length > 1 &&
                  data
                    .sort(
                      (a, b) =>
                        new Date(b.date).getTime() - new Date(a.date).getTime()
                    )
                    .map((item, index) => {
                      return (
                        <ItemList
                          item={{
                            name: item.name,
                            ago: getNow(new Date(item.date)),
                            isSeen: item.isSeen,
                          }}
                          key={index}
                        />
                      );
                    })}
              </ul>
            </div>
          </Notificacion>
          <UserButton />
        </div>
      </nav>
    </header>
  );
}
