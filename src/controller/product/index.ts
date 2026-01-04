import { Request, Response, NextFunction } from "express";
import { ProductService } from "@/services/product/product_service";
import {
  AddProductSchema,
  FetchAllProductsSchema,
  UpdateProductSchema,
} from "@/services/product/product_schema";

export class ProductController {
  static async FetchAllProducts(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { query } = FetchAllProductsSchema.parse({
      query: req.query,
    });

    const data = await ProductService.FetchAllProducts(query, req.userInfo.id);

    res.send({
      data,
    });
  }

  static async AddProduct(req: Request, res: Response, next: NextFunction) {
    const { body } = await AddProductSchema.parseAsync({ body: req.body });
    const updatedData = body.map((p) => ({ ...p, user_id: req.userInfo.id }));
    const data = await ProductService.AddProduct(updatedData, req.userInfo.id);

    res.json({
      data,
    });
  }

  static async UpdateProduct(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const { body, params } = UpdateProductSchema.parse({
      body: req.body,
      params: req.params,
    });
    const data = await ProductService.UpdateProduct(
      parseInt(String(params.id)),
      body,
      req.userInfo.id
    );

    res.json({
      data,
    });
  }

  static async DeleteProduct(req: Request, res: Response) {
    const force = Boolean(req.query?.force);

    const data = await ProductService.DeleteProduct(
      parseInt(req.params.id),
      force,
      req.userInfo.id
    );

    res.json({
      data,
    });
  }
}
