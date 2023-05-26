import userModel from "../../../models/userModel";
import bcryptjs from "bcryptjs";
import dotenv from "dotenv";
import moment from "moment/moment";

export default async function CreateHandler(req, res) {
  const model = new userModel();

  if (req.method === "POST") {
    const { nombre, apellido, telefono, email, password, id_role, is_active } =
      req.body;
    const error = {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      password: "",
    };
    const NODE_ENV = process.env.NODE_ENV | "development";
    dotenv.config({
      path: `.env.${NODE_ENV}`,
    });

    //Validacion
    if (email || email.trim() !== "") {
      const isEmailExist = await model.isEmailExist(email);
      if (isEmailExist) {
        error.email = "Este correo ya esta registrado";
      }
    } else {
      error.email = "El correo es requerido";
    }

    if (!nombre || nombre.trim().length < 2) {
      error.nombre = "El nombre es requerido";
    }

    if (!apellido || apellido.trim().length < 2) {
      error.apellido = "El apellido es requerido";
    }

    if (!telefono || telefono.trim().length < 8) {
      error.telefono = "El telefono es requerido";
    }

    if (!password || password.trim().length < 8) {
      error.password = "La contraseña es requerida";
    }

    if (
      error.nombre !== "" ||
      error.apellido !== "" ||
      error.telefono !== "" ||
      error.email !== "" ||
      error.password !== ""
    ) {
      return res.status(422).json({
        typeError: "validation",
        messages: error,
      });
    }

    //Hash contraseña
    const passwordHashed = bcryptjs.hashSync(password.trim(), 10);
    moment.locale("es-sv");
    const result = await model.createUser({
      id_role: id_role,
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      telefono: telefono.trim(),
      email: email.trim(),
      password: passwordHashed,
      is_active: is_active,
      created_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
      updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
    });

    return res.status(201).json("OK");
  }
}
