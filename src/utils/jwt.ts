import { JWTPayload } from "@/types/User.types";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.JWT_SECRET as string;

export const generateAccessToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, secret, {
    expiresIn: "1hr",
  });
};

const refreshSecret = process.env.JWT_REFRESH_SECRET as string;

export const generateRefreshToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, refreshSecret, {
    expiresIn: "24hr",
  });
};

export const verifyAccessToken = (token: string): JWTPayload => {
  return jwt.verify(token, secret) as JWTPayload;
};

export const verifyRefreshToken = (token: string): JWTPayload => {
  return jwt.verify(token, refreshSecret) as JWTPayload;
};
