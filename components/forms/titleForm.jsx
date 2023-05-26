import React from "react";
import Link from "next/link";
import { AngleDown } from "@/app/shared/CustomIcons";
import { usePathname, useSearchParams } from "next/navigation";

export default function TitleForm({ title }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <div className="flex items-center gap-2 mt-2">
      <Link
        href={
          searchParams.get("redirectFromDetails")
            ? pathname.slice(0, pathname.lastIndexOf("/"))
            : pathname.split("/")[1]
        }
        className="flex flex-row items-center justify-center group/regresar w-[30px] h-[30px] rounded-md hover:bg-gray-200"
      >
        <AngleDown
          className={
            "w-4 fill-blue-500 rotate-90 group-hover/regresar:fill-blue-600 "
          }
        />
      </Link>
      <h1 className="font-extrabold text-gray-700 text-lg">{title}</h1>
    </div>
  );
}
