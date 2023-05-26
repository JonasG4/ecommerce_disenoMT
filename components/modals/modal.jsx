import { useRef } from "react";
import { CircleXmarkIcon } from "@/app/shared/CustomIcons";

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  title,
  width = "400",
  height = "400",
}) {
  const ref = useRef();

  const handleClose = (event) => {
    if (isOpen && ref.current.id === event.target.id) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-[500] bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
          onClick={handleClose}
          ref={ref}
          id="modalOutside"
        >
          <article
            className={`relative w-[${width}px] h-[${height}px] bg-gray-50 rounded-md shadow-md ring-1 ring-gray-300 p-4`}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold text-gray-700">{title}</p>
              <span
                onClick={() => setIsOpen(false)}
                className="w-[30px] h-[30px] rounded-md shadow-md cursor-pointer flex items-center justify-center ring-1 ring-gray-400 group/close hover:ring-red-500"
              >
                <CircleXmarkIcon className="w-7 fill-gray-50 text-gray-600 group-hover/close:text-red-500" />
              </span>
            </div>
            <div className="h-[1px] w-full bg-gray-300 my-4"></div>
            {children}
          </article>{" "}
        </div>
      )}
    </>
  );
}
