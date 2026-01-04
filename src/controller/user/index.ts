import ProfileService from "@/services/user/profile_service";
import { Request, Response } from "express";
import { UpdateProfileSchema } from "./user.schema";

class UserController {
  static async ProfileInfo(req: Request, res: Response) {
    const data = await ProfileService.GetProfileInfo(req?.userInfo?.id);
    return res.json({
      data,
    });
  }

  static async UpdateProfile(req: Request, res: Response) {
    const { body } = UpdateProfileSchema.parse({
      body: req.body,
    });
    const data = await ProfileService.UpdateProfileInfo(body, req.userInfo.id);

    return res.json({
      data,
    });
  }

  static async FetchAllProductsBelongsToUser(req: Request, res: Response) {
    const data = await ProfileService.ProductsBelongsToUser(req?.userInfo?.id);

    return res.json({
      data,
    });
  }

  static async FetchAllCategoriesBelongsToUser(req: Request, res: Response) {
    const data = await ProfileService.FetchAllCategoriesOfUser(req.userInfo.id);

    return res.json({
      data,
    });
  }
}

export default UserController;
