import userModel from "@/models/userModel";

export default async function handler(req, res) {
  const model = new userModel();

  if (req.method === "GET") {
    const roles = await model.getAllRoles();
    res.status(200).json(roles);
}
}
