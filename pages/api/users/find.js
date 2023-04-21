import userModel from "../../../models/userModel";

export default async function FindHandler(req, res) {
  const model = new userModel();

  if (req.method === "POST") {
    const usersFiltered = await model.filterUsers(req.body.filter);
    res.status(200).json(usersFiltered);
}
}
