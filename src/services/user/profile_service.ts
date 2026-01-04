import { UpdateProfileT } from "@/controller/user/user.types";
import Category from "@/db/models/category";
import Product from "@/db/models/product";
import User from "@/db/models/user";
import { BadRequestError } from "@/utils/AppError";

class ProfileService {
  static async GetProfileInfo(user_id: number) {
    const response = await User.findByPk(user_id);

    return response?.toJSON();
  }

  static async UpdateProfileInfo(data: UpdateProfileT, user_id: number) {
    const response = await User.findByPk(user_id);

    if (!response)
      throw new BadRequestError(`User not available with ${user_id}`);

    await response.update(
      {
        ...data,
      },
      { returning: true }
    );

    return response;
  }

  static async ProductsBelongsToUser(id: number) {
    const response = await Product.findAll({
      where: {
        user_id: id,
      },
    });

    return response;
  }

  static async FetchAllCategoriesOfUser(id: number) {
    const response = await Category.findAll({
      where: {
        user_id: id,
      },
    });

    return response;
  }
}

export default ProfileService;
