import { Request, Response, NextFunction } from "express";

export class Category {
  static async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    console.log(req);
  }
}
