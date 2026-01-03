import Cart from "@/db/models/cart";
import { AddProductToCartT, UpdateProductToCartT } from "./cart_types";
import { NotFoundError } from "@/utils/AppError";

export class CartService {
  static async CreateItemsInCart(data: AddProductToCartT, id: number) {
    const response = await Cart.create({ ...data, user_info: id });
    return response.toJSON();
  }

  static async FetchItems() {
    const response = await Cart.findAll();
    return response;
  }

  static async UpdateCartItems(data: UpdateProductToCartT, user_id: number) {
    const cartItem = await Cart.findOne({
      where: {
        id: data.id,
        user_info: user_id,
      },
    });

    if (!cartItem)
      throw new NotFoundError("The Item you looking for no longer exist");

    if (cartItem.quantity === data.quantity) {
      return cartItem.toJSON();
    }
    cartItem.quantity = data.quantity;

    await cartItem.save();

    return cartItem.toJSON();
  }

  static async DeleteCartItem(id: number) {
    const cartItem = await Cart.findByPk(id);

    if (!cartItem) throw new NotFoundError(`Unable to find item with ${id}`);

    cartItem.destroy();
    return `Cart with ${cartItem.id} deleted`;
  }
}
