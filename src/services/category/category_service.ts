import Category from "@/db/models/category";
import {
  CategoryResponseT,
  NewCategoryT,
  UpdateCategoryT,
} from "./category_types";
import { BadRequestError } from "@/utils/AppError";
import User from "@/db/models/user";

export class CategoryService {
  static async FetchAllCategories(user_id: number) {
    const categories = await Category.findAll({
      where: {
        user_id,
      },
      include: {
        model: User,
        as: "user",
        attributes: ["first_name", "email"],
      },
      order: [["id", "asc"]],
    });

    return categories.map((c) => c.toJSON());
  }

  static async AddNewCategory(data: NewCategoryT, user_id: number) {
    const updateData = data.map((c) => ({ ...c, user_id }));
    const response = await Category.bulkCreate(updateData, { validate: true });
    return response.flatMap((c) => c);
  }

  static async UpdateCategory(
    id: number,
    data: UpdateCategoryT,
    user_id: number
  ) {
    const category = await Category.findOne({
      where: { id, user_id },
    });

    if (!category)
      throw new BadRequestError("Unable to find category with specified data");

    await category.update(data);
    return category.toJSON();
  }

  static async DeleteCategory(
    id: number,
    user_id: number,
    force?: boolean
  ): Promise<string> {
    const category = await Category.findOne({
      where: { id, user_id },
      paranoid: !force,
    });

    if (!category) {
      throw new BadRequestError("Unable to find category with specified id");
    }

    const categoryName = category.name;

    if (force) {
      await category.destroy({ force: true });
    } else {
      await category.destroy();
    }

    return `${categoryName} deleted ${force ? "permanently" : "successfully"}`;
  }
}
