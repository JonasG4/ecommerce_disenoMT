import userModel from "../../../models/userModel";

export default async function singleHandler(req, res) {
  const model = new userModel();

  if (req.method === "GET") {
    const { id } = req.query;
    const user = await model.getUserById(id);
    console.log(user);
    if (!user) {
      return res.status(404).json(`El usuario con id ${id} no existe`);
    }
    res.status(200).json(user);
  }
}
