import User from "@/db/models/user";
import { UnauthorizedError } from "@/utils/AppError";
import { verifyAccessToken } from "@/utils/jwt";
import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userInfo: User;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) throw new UnauthorizedError("You do not have authorization");
  if (!authHeader?.startsWith("Bearer "))
    throw new UnauthorizedError("Missing or invalid authorization header");

  const token = authHeader.split(" ")[1];

  const decoded = verifyAccessToken(token);

  if (!decoded) throw new UnauthorizedError("You do not have authorization");

  const userInfo = await User.findByPk(decoded.userId, {
    attributes: {
      exclude: ["password", "refresh_token", "reset_password_token"],
    },
  });

  if (!userInfo) throw new UnauthorizedError("You do not have authorization");

  req.userInfo = userInfo;
  next();
};
