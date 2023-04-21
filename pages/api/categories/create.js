import categoryModel from "../../../models/categoryModel";
import moment from "moment/moment";

export default async function CreateHandler(req, res) {
  const model = new categoryModel();

  if (req.method === "POST") {
    const { nombre, descripcion, is_active } = req.body;

    moment.locale("es-sv");
    const result = await model.createCategory({
      nombre: nombre,
      descripcion: descripcion,
      is_active: is_active,
      created_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
      updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
    });

    return res.status(200).json(result);
  }
}
