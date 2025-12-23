import { Document } from "mongoose";

export type IUser = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  isVerified: boolean;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  refreshTokens: string[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  role: "admin" | "merchant" | "user";
} & Document;

export interface SignupDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  data: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    isVerified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  email: string;
  userId: string;
}
