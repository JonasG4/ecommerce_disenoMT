import { useState } from "react";
import { SearchGlass } from "@/app/shared/CustomIcons";

export default function SearchInput({ data, setData, placeholder }) {
  const [search, setSearch] = useState("");

  const handleChangeSearch = (event) => {
    const { value } = event.target;
    setSearch(value);
    const filteredData = data.filter((item) => {
      const fullName = `${item.nombre} ${item.apellido}`;
      return (
        fullName.toLowerCase().includes(value.toLowerCase()) ||
        item.email?.toLowerCase().includes(value.toLowerCase()) ||
        item.telefono?.toLowerCase().includes(value.toLowerCase())
      );
    });

    setData([...filteredData]);
  };

  return (
    <div className="relative">
      <input
        type="search"
        value={search}
        onChange={handleChangeSearch}
        className="w-[350px] text-sm text-gray-600 pl-9 pr-2 rounded-md ring-1 bg-gray-100 ring-gray-400 border-none placeholder:text-sm"
        placeholder={placeholder}
      />
      <SearchGlass
        className={`w-4 absolute top-[10px] left-2 fill-gray-400`}
        width={16}
      />
    </div>
  );
}
