import Product from "@/db/models/product";
import { AddProductT } from "./product_types";
import { BadRequestError } from "@/utils/AppError";
import Category from "@/db/models/category";

export class ProductService {
  static async FetchAllProducts() {
    const response = await Product.findAll({
      include: [
        {
          model: Category,
          as: "categories",
        },
      ],
      attributes: {
        exclude: ["category_id"],
      },
    });
    return response;
  }

  static async AddProduct(data: AddProductT) {
    const response = await Product.bulkCreate(data, { validate: true });
    return response.flatMap((m) => m);
  }

  static async UpdateProduct(id: number, data: AddProductT) {
    const product = await Product.findByPk(id);
    if (!product) throw new BadRequestError("InValid Product ID Supplied");
    const update = await product.update(data);
    return update.toJSON();
  }

  static async DeleteProduct(id: number, force: boolean) {
    const response = await Product.findByPk(id, { paranoid: !force });

    if (!response)
      throw new BadRequestError("Unable to find product with provided ID");

    const name = response.name;

    if (force) {
      await response.destroy({ force: true });
    } else {
      await response.destroy();
    }

    return `${name} deleted ${force ? "permanently" : "successfully"}`;
  }
}
