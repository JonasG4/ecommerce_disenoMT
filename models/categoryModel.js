import { result } from "lodash";
import { pool } from "../config/db";

export default class CategoryModel {
  constructor() {
    this.db = pool;
  }

  async getAllCategories() {
    const query =
      "SELECT id_categoria, nombre, descripcion, is_active FROM tbl_producto_categorias ORDER BY id_categoria DESC";

    const categories = await this.db.query(query);

    return categories[0];
  }

  async filterCategories(filter) {
    const query =
      "SELECT id_categoria, nombre, descripcion, is_active FROM tbl_producto_categorias WHERE nombre LIKE ? OR descripcion LIKE ? ORDER BY id_categoria ASC";
    const result = await this.db.query(query, [
      "%" + filter + "%",
      "%" + filter + "%",
    ]);
    return result[0];
  }

  async createCategory(category) {
    const query = "INSERT INTO tbl_producto_categorias SET ?";

    if (await this.db.query(query, [category])) {
      return true;
    } else {
      return false;
    }
  }
}
