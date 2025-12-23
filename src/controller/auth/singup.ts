import { AuthService } from "@/services/auth_service";
import { Request, Response, NextFunction } from "express";

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    const user = await AuthService.Signup(req.body);

    res.status(201).json({
      message: "User Signup Successful",
      data: user,
    });
  }
}
