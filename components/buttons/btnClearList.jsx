'use client'
import React from "react";

export default function BtnClearList({ data }) {

    const addElement = () => {
        console.log(new Date(data[0].date).getTime() < new Date(data[1].date).getTime());
    }

    return (
    <button
      className="text-sm text-blue-500 font-semibold hover:opacity-70"
      onClick={addElement}
    >
      Borrar todo
    </button>
  );
}
