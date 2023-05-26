import userModel from "@/models/userModel";
import moment from "moment";
import bcryptjs from "bcryptjs";

export default async function singleHandler(req, res) {
  const model = new userModel();

  if (req.method === "GET") {
    const { id } = req.query;
    const user = await model.getUserById(id);
    if (!user) {
      return res.status(404).json(`El usuario con id ${id} no existe`);
    }
    res.status(200).json(user);
  }

  if (req.method === "PUT") {
    const {
      id_usuario,
      id_role,
      nombre,
      apellido,
      telefono,
      email,
      oldEmail,
      is_active,
    } = req.body;

    const error = {
      nombre: "",
      apellido: "",
      telefono: "",
      email: "",
      password: "",
    };

    //Validar que el correo no esté repetido
    if (oldEmail !== email) {
      if (await model.isEmailExist(email)) {
        error.email = "Este correo ya esta registrado";
      }
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

    if (
      error.nombre !== "" ||
      error.apellido !== "" ||
      error.telefono !== "" ||
      error.email !== ""
    ) {
      return res.status(422).json({
        typeError: "validation",
        messages: error,
      });
    }

    moment.locale("es-sv");
    const result = await model.updateUser({
      id_usuario,
      nombre,
      apellido,
      telefono,
      email,
      id_role: parseInt(id_role),
      is_active,
      updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
    });

    return res.status(200).json(result);
  }

  if (req.method === "DELETE") {
    const { id } = req.query;
    const user = await model.getUserById(id);
    if (!user) {
      return res.status(404).json(`El usuario con id ${id} no existe`);
    }
    const result = await model.deleteUser(id);
    return res.status(200).json(result);
  }

  if (req.method === "PATCH") {
    const { id } = req.query;
    const { newPassword } = req.body;

    if (newPassword.trim().length < 8) {
      return res.status(422).json({
        typeError: "validation",
        messages: {
          password: "La contraseña debe tener al menos 8 caracteres",
        },
      });
    }
    const passwordHashed = bcryptjs.hashSync(newPassword.trim(), 10);

    const result = await model.updatePassword({
      id_usuario: id,
      password: passwordHashed,
      updated_at: moment().format("MM/DD/YYYY, HH:mm:ss"),
    });

    if (result) {
      return res.status(200).json(result);
    }

    return res.status(500).json("Error al actualizar la contraseña");
  }
}
