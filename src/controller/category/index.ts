import { CategoryService } from "@/services/category/category_service";
import { UpdateCategoryT } from "@/services/category/category_types";
import { Request, Response, NextFunction } from "express";

export class Category {
  static async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = await CategoryService.FetchAllCategories();

    res.json({
      data,
      from: "FetchAll Categories",
    });
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    const data = await CategoryService.AddNewCategory(req.body, 1);
    res.json({
      data,
    });
  }

  static async updateCategory(
    req: Request<{ id: string }, {}, UpdateCategoryT>,
    res: Response
  ) {
    const data = await CategoryService.UpdateCategory(
      parseInt(req.params.id),
      req.body
    );

    res.json({
      data,
    });
  }

  static async deleteCategory(req: Request<{ id: string }>, res: Response) {
    const { id } = req.params;

    const force = Boolean(req.query?.force);

    const data = await CategoryService.DeleteCategory(parseInt(id), force);

    res.json({
      message: data,
    });
  }
}
