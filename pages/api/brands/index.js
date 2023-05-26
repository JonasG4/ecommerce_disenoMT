import brandModel from "@/models/brandModel";
import { converToCode } from "@/utils/transformString";
import moment from "moment";

export default async function handler(req, res) {
  const model = new brandModel();

  // OBTENER TODAS LAS MARCAS
  if (req.method === "GET") {
    const brands = await model.getAllBrands();
    res.status(200).json(brands);
  }

  // CREAR UNA MARCA
  if (req.method === "POST") {
    const { nombre, is_active } = req.body;

    const error = {
      nombre: "",
    };

    if (!nombre || nombre.trim().length < 2) {
      error.nombre = "El nombre es requerido";
    }

    //validacion
    if (error.nombre !== "") {
      return res.status(422).json({
        typeError: "validation",
        messages: error,
      });
    }

    moment.locale("es-sv");
    const codigo = converToCode(nombre.trim().toLowerCase());
    try {
      await model.createBrand({
        codigo: codigo,
        nombre: nombre.trim().toLowerCase(),
        is_active: is_active,
        created_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
        updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
      });
    } catch (error) {
      return res.status(500).json({
        typeError: "server",
        messages: error.message,
      });
    }
  }
}
