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

  static async signin(req: Request, res: Response, next: NextFunction) {
    const user = await AuthService.Signin(req.body);

    res.json({
      message: "User Signin Successful",
      data: user,
    });
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    await AuthService.ForgotPassword(req.body);

    res.json({
      message: "Reset Password Mail sent, please check your email",
    });
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      let data: unknown = {
        message: "password success",
      };

      data = await AuthService.ResetPassword(req.body);

      res.json(data);
    } catch (err) {
      const error = err as unknown as Error;
      res.json({
        message: error.message,
      });
    }
  }
}
