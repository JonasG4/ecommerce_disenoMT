import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mt-10 flex flex-col w-full items-center justify-center">
      <Image
        src="/images/portada.jpg"
        width={1000}
        height={200}
        alt="PRODUCTOS EBEN EZER"
      />

      <h1 className="mt-10 uppercase text-2xl font-bold text-gray-700">
        COMPRA POR CATEGORIA
      </h1>
      <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
      <div className="grid p-5">
        <ul className="p-4 grid grid-cols-3 gap-4">
          <li className="relative">
            <Link
              href={""}
              className="relative bg-black bg-opacity-25 ring-1 ring-gray-400 flex items-center justify-center w-[350px] h-[100px] rounded-md backdrop-blur-sm"
            >
              <Image
                src={"/images/categorias/dormitorio.jpg"}
                className="w-full h-full rounded-md object-cover filter brightness-50"
                width={350}
                height={100}
                quality={100}
                alt="Categoria Dormitorio"
              />
              <span className="absolute text-xl top-1/2 right-1/2 translate-x-[50%] -translate-y-[50%] text-gray-50 uppercase font-black">
                Dormitorio
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href={""}
              className="relative bg-black bg-opacity-25 ring-1 ring-gray-400 flex items-center justify-center w-[350px] h-[100px] rounded-md backdrop-blur-sm"
            >
              <Image
                src={"/images/categorias/electrodomesticos.jpg"}
                className="w-full h-full rounded-md object-cover filter brightness-50"
                width={350}
                height={100}
                quality={100}
                alt="Categoria Dormitorio"
              />
              <span className="absolute text-xl top-1/2 right-1/2 translate-x-[50%] -translate-y-[50%] text-gray-50 uppercase font-black">
                Electrodomésticos
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href={""}
              className="relative bg-black bg-opacity-25 ring-1 ring-gray-400 flex items-center justify-center w-[350px] h-[100px] rounded-md backdrop-blur-sm"
            >
              <Image
                src={"/images/categorias/mubles.jpg"}
                className="w-full h-full rounded-md object-cover filter brightness-50"
                width={350}
                height={100}
                quality={100}
                alt="Categoria Dormitorio"
              />
              <span className="absolute text-xl top-1/2 right-1/2 translate-x-[50%] -translate-y-[50%] text-gray-50 uppercase font-black">
                Muebles
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href={""}
              className="relative bg-black bg-opacity-25 ring-1 ring-gray-400 flex items-center justify-center w-[350px] h-[100px] rounded-md backdrop-blur-sm"
            >
              <Image
                src={"/images/categorias/lineablanca.jpg"}
                className="w-full h-full rounded-md object-cover filter brightness-50"
                width={350}
                height={100}
                quality={100}
                alt="Categoria Dormitorio"
              />
              <span className="absolute text-xl top-1/2 right-1/2 translate-x-[50%] -translate-y-[50%] text-gray-50 uppercase font-black">
                Linea Blanca
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href={""}
              className="relative bg-black bg-opacity-25 ring-1 ring-gray-400 flex items-center justify-center w-[350px] h-[100px] rounded-md backdrop-blur-sm"
            >
              <Image
                src={"/images/categorias/audioyvideo.jpg"}
                className="w-full h-full rounded-md object-cover filter brightness-50"
                width={350}
                height={100}
                quality={100}
                alt="Categoria Dormitorio"
              />
              <span className="absolute text-xl top-1/2 right-1/2 translate-x-[50%] -translate-y-[50%] text-gray-50 uppercase font-black">
                Audio y video
              </span>
            </Link>
          </li>
          <li className="relative">
            <Link
              href={""}
              className="relative bg-black bg-opacity-25 ring-1 ring-gray-400 flex items-center justify-center w-[350px] h-[100px] rounded-md backdrop-blur-sm"
            >
              <Image
                src={"/images/categorias/agroindustrial.jpg"}
                className="w-full h-full rounded-md object-cover filter brightness-50"
                width={350}
                height={100}
                quality={100}
                alt="Categoria Dormitorio"
              />
              <span className="absolute text-xl top-1/2 right-1/2 translate-x-[50%] -translate-y-[50%] text-gray-50 uppercase font-black">
                Agroindustrial
              </span>
            </Link>
          </li>
        </ul>
      </div>

      <h1 className="mt-10 uppercase text-2xl font-bold text-gray-700">
        NUESTRAS MARCAS
      </h1>
      <div className="w-[200px] h-[2px] bg-red-300 my-4"></div>
      <div className="grid grid-cols-4 gap-8 my-4">
        <Image src={"/images/marcas/Samsung.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/Frigidaire.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/LG.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/Mabe.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/Oster.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/Panasonic.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/Sony.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/whirlpool.png"} width={200} height={100} alt="Marca SAMSUNG"/>
        <Image src={"/images/marcas/indufom.jpg"} width={200} height={100} alt="Marca SAMSUNG"/>
      </div>
    </div>
  );
}
