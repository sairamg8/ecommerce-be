import {
  CategorySchema,
  DeleteCategorySchema,
  UpdateCategorySchema,
} from "@/services/category/category_schema";
import { CategoryService } from "@/services/category/category_service";
import { UpdateCategoryT } from "@/services/category/category_types";
import { Request, Response, NextFunction } from "express";

export class Category {
  static async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const data = await CategoryService.FetchAllCategories(req.userInfo?.id);

    res.json(data);
  }

  static async createCategory(req: Request, res: Response, next: NextFunction) {
    const { body } = CategorySchema.parse({
      body: req.body,
    });
    const data = await CategoryService.AddNewCategory(body, req.userInfo?.id);
    res.json({
      data,
    });
  }

  static async updateCategory(
    req: Request<{ id: string }, {}, UpdateCategoryT>,
    res: Response
  ) {
    const { body, params } = UpdateCategorySchema.parse({
      body: req.body,
      params: req.params,
    });
    const data = await CategoryService.UpdateCategory(
      parseInt(String(params.id)),
      body,
      req.userInfo.id
    );

    res.json({
      data,
    });
  }

  static async deleteCategory(req: Request, res: Response) {
    const { params } = DeleteCategorySchema.parse({
      params: req.params,
    });

    const force = Boolean(req.query?.force);

    const data = await CategoryService.DeleteCategory(
      parseInt(params.id),
      req.userInfo.id,
      force
    );

    res.json({
      message: data,
    });
  }
}
