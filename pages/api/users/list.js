import userModel from "@/models/userModel";

export default async function ListHandler(req, res) {
  const model = new userModel();

  if (req.method === "GET") {
    const users = await model.getAllUsers();
    res.status(200).json(users);
  }
}
