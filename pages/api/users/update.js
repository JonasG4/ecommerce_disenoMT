import userModel from "../../../models/userModel";
import moment from "moment/moment";

export default async function UpdateHandler(req, res) {
  const model = new userModel();

  if (req.method === "PUT") {
    const {
      id_usuario,
      nombre,
      apellido,
      telefono,
      email,
      oldEmail,
      is_active,
    } = req.body;

    //Validar que el correo no esté repetido
    if (oldEmail !== email) {
      if (await model.isEmailExist(email)) {
        return res.status(400).json({
          typeError: "validation",
          field: "email",
          message: "Este correo ya está en uso",
        });
      }
    }

    moment.locale("es-sv");
    const result = await model.updateUser({
      id_usuario,
      nombre,
      apellido,
      telefono,
      email,
      is_active,
      updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
    });

    return res.status(200).json(result);
  }
}
