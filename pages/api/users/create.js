import userModel from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment/moment";

export default async function CreateHandler(req, res) { 
    const model = new userModel();

  if (req.method === "POST") {
    const { nombre, apellido, telefono, email, password, is_active } = req.body;

    const NODE_ENV = process.env.NODE_ENV | "development";
    dotenv.config({
      path: `.env.${NODE_ENV}`,
    });

    //Validar que el correo no esté repetido
    if (await model.isEmailExist(email)) {
      return res.status(400).json({
        typeError: "validation",
        field: "email",
        message: "Este correo ya está en uso",
      });
    }

    //Hash contraseña
    const passwordHashed = bcryptjs.hashSync(password, 10);
    moment.locale("es-sv");
    const result = await model.createUser({
      nombre: nombre,
      apellido: apellido,
      telefono: telefono,
      email: email,
      password: passwordHashed,
      is_active: is_active,
      created_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
      updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
    });

    return res.status(200).json(result);
  }
}
