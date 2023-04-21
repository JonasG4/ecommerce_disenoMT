"use client";
import {useState} from "react";
import { SearchGlass } from "../app/shared/CustomIcons";

export default function SearchInTable({label, setData}) {
  const [searchResult, setSearchResult] = useState("");

  const findData = async (e) => {
    const {data : setSearch} = await fetch.get("/api/users/customers/")
  }
  
  return (
    <div className="relative">
      <input
        type="search"
        onChange={findData}
        className="max-w-[300px] text-sm text-gray-600 pl-9 pr-2 rounded-md ring-1 bg-gray-100 ring-gray-400 border-none placeholder:text-sm"
        placeholder={label}
      />
      <SearchGlass className={`w-4 absolute top-[10px] left-2 fill-gray-400`} />
    </div>
  );
}
