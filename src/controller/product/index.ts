import { Request, Response, NextFunction } from "express";
import { ProductService } from "@/services/product/product_service";
import {
  AddProductSchema,
  FetchAllProductsSchema,
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

    const data = await ProductService.FetchAllProducts(query);

    res.send({
      data,
    });
  }

  static async AddProduct(req: Request, res: Response, next: NextFunction) {
    const { body } = await AddProductSchema.parseAsync({ body: req.body });
    const updatedData = body.map((p) => ({ ...p, user_id: req.userInfo.id }));
    const data = await ProductService.AddProduct(updatedData);

    res.json({
      data,
    });
  }

  static async UpdateProduct(
    req: Request<{ id: string }>,
    res: Response,
    next: NextFunction
  ) {
    const data = await ProductService.UpdateProduct(
      parseInt(req.params.id),
      req.body
    );

    res.json({
      data,
    });
  }

  static async DeleteProduct(req: Request, res: Response) {
    const force = Boolean(req.query?.force);

    const data = await ProductService.DeleteProduct(
      parseInt(req.params.id),
      force
    );

    res.json({
      data,
    });
  }
}
