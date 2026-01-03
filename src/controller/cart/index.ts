import { CartService } from "@/services/cart";
import {
  AddProductsToCartSchema,
  UpdateCartProductSchema,
} from "@/services/cart/cart_schema";
import { Request, Response } from "express";

export class CartController {
  static async FetchCartItems(req: Request, res: Response) {
    const response = await CartService.FetchItems();

    return res.json({
      data: response,
    });
  }

  static async CreateCartItems(req: Request, res: Response) {
    const { body } = AddProductsToCartSchema.parse({
      body: req.body,
    });

    const { id } = req.userInfo;

    const response = await CartService.CreateItemsInCart(body, id);

    return res.json({
      data: response,
    });
  }

  static async UpdateCartItems(req: Request, res: Response) {
    const { body } = UpdateCartProductSchema.parse({
      body: req.body,
    });
    const response = await CartService.UpdateCartItems(body, req.userInfo?.id);

    return res.json({
      data: response,
    });
  }

  static async DeleteCartItem(req: Request, res: Response) {
    console.log({
      id: req.params.id,
      id1: req.query.id,
    });
    const response = await CartService.DeleteCartItem(Number(req.params.id));

    return res.json({
      data: response,
    });
  }
}
