import { result } from "lodash";
import { pool } from "../config/db";

export default class CustomerModel {
  constructor() {
    this.db = pool;
  }

  async createUser(user) {
    const query = "INSERT INTO tbl_usuarios SET ?";

    if (await this.db.query(query, [user])) {
      return true;
    } else {
      return false;
    }
  }

  async getAllUsers() {
    const query =
      "SELECT id_usuario, nombre, apellido, email, telefono, is_active, created_at, updated_at FROM tbl_usuarios ORDER BY id_usuario DESC";
    const users = await this.db.query(query);
    return users[0];
  }

  async getUserById(id) {
    const query =
      "SELECT id_usuario, nombre, id_role, apellido, email, telefono, is_active, is_google, is_facebook, created_at, updated_at FROM tbl_usuarios WHERE id_usuario = ? LIMIT 1";
    const user = await this.db.query(query, [id]);

    if (!user) {
      return false;
    }
    return user[0][0];
  }

  async filterUsers(filter) {
    const query =
      "SELECT id_usuario, nombre, apellido, email, telefono, is_active, created_at, updated_at FROM tbl_usuarios WHERE nombre LIKE ? OR apellido LIKE ? OR email LIKE ? ORDER BY id_usuario ASC";
    const result = await this.db.query(query, [
      "%" + filter + "%",
      "%" + filter + "%",
      "%" + filter + "%",
    ]);
    return result[0];
  }

  async updateUser(user) {
    const query =
      "UPDATE tbl_usuarios SET nombre=?, apellido=?, email=?, telefono=?, is_active=?, updated_at=? WHERE id_usuario=?";
    const response = await this.db.query(query, [
      user.nombre,
      user.apellido,
      user.email,
      user.telefono,
      user.is_active,
      user.updated_at,
      user.id_usuario,
    ]);

    console.log(response[0]);
  }

  async isEmailExist(email) {
    const query = "SELECT id_usuario FROM tbl_usuarios WHERE email=? LIMIT 1";

    const result = await this.db.query(query, email);

    if (result[0].length > 0) {
      return true;
    } else {
      return false;
    }
  }
}
