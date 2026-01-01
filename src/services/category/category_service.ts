import Category from "@/db/models/category";
import {
  CategoryResponseT,
  NewCategoryT,
  UpdateCategoryT,
} from "./category_types";
import { BadRequestError } from "@/utils/AppError";

export class CategoryService {
  static async FetchAllCategories(): Promise<CategoryResponseT[]> {
    const response = await Category.findAll({ raw: true });
    return response;
  }

  static async AddNewCategory(data: NewCategoryT, user_id: number) {
    const updateData = data.map((c) => ({ ...c, user_id }));
    const response = await Category.bulkCreate(updateData, { validate: true });
    return response.flatMap((c) => c);
  }

  static async UpdateCategory(id: number, data: UpdateCategoryT) {
    const category = await Category.findByPk(id);

    if (!category)
      throw new BadRequestError("Unable to find category with specified data");

    await category.update(data);
    return category.toJSON();
  }

  static async DeleteCategory(id: number, force?: boolean): Promise<string> {
    const category = await Category.findByPk(id, { paranoid: !force });

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
