import Product from "@/db/models/product";
import {
  AddProductT,
  AddProductWithUserT,
  PaginatedT,
  UpdateProductT,
} from "./product_types";
import { BadRequestError } from "@/utils/AppError";
import Category from "@/db/models/category";
import { Op, WhereOptions } from "sequelize";

export class ProductService {
  static async FetchAllProducts(params: PaginatedT, user_id: number) {
    const page = Math.max(1, params.page ?? 1);
    const limit = Math.min(100, Math.max(1, params.limit ?? 20));
    const offset = (page - 1) * limit;

    const where: WhereOptions = {};

    where.user_id = user_id;

    if (params?.category_id) {
      where.category_id = params.category_id;
    }

    if (params?.is_active) {
      where.is_active = params.is_active;
    }

    if (params?.is_featured) {
      where.is_featured = params.is_featured;
    }

    if (params?.max_price || params?.min_price) {
      const priceFilter: {
        [Op.lte]?: number;
        [Op.gte]?: number;
      } = {};

      if (params.max_price) priceFilter[Op.lte] = params.max_price;

      if (params.min_price) priceFilter[Op.gte] = params.min_price;

      where.price = priceFilter;
    }

    if (params.search) {
      where[Op.or as any] = [
        {
          name: { [Op.iLike]: `%${params.search}%` },
        },
        {
          short_description: { [Op.iLike]: `%${params.search}%` },
        },
      ];
    }

    const allowedSorts = [
      "id",
      "name",
      "price",
      "sale_price",
      "stock_quantity",
      "created_at",
    ];
    const sortOn = allowedSorts.includes(params.sortBy || "")
      ? params.sortBy!
      : "created_at";
    const sortOrder = params.sortOrder === "asc" ? "asc" : "desc";

    const { count, rows } = await Product.findAndCountAll({
      where,
      order: [
        [sortOn, sortOrder],
        ["id", "asc"],
      ],
      limit,
      offset,
      distinct: true,
      include: [
        {
          model: Category,
          as: "category",
          attributes: {
            exclude: ["deleted_at"],
          },
        },
      ],
      attributes: {
        exclude: ["category_id", "deleted_at"],
      },
    });
    return {
      data: rows,
      total: count,
      page,
      limit,
      totalPages: Math.ceil(count / limit),
    };
  }

  static async AddProduct(data: AddProductWithUserT, id: number) {
    const response = await Product.bulkCreate(data, {
      validate: true,
    });
    return response.flatMap((m) => m);
  }

  static async UpdateProduct(
    id: number,
    data: UpdateProductT,
    user_id: number
  ) {
    const product = await Product.findOne({
      where: {
        id,
        user_id: user_id,
      },
    });
    if (!product) throw new BadRequestError("InValid Product ID Supplied");
    const update = await product.update({ ...data });
    return update.toJSON();
  }

  static async DeleteProduct(id: number, force: boolean, user_id: number) {
    const response = await Product.findOne({
      where: {
        id: id,
        user_id,
      },
      paranoid: !force,
    });

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
