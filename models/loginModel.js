import { pool } from "../config/db";

export default class LoginModel {
  constructor() {
    this.db = pool;
  }

  async validateUser(user, password) {
    const query =
      "SELECT user, password from tbl_administradores WHERE user = ? LIMIT 1";
    const result = await this.db.query(query, [user]);
    const adminCredentials = result[0][0];

    if (adminCredentials && adminCredentials["password"] === password) {
      return true;
    } else {
      return false;
    }
  }
}
