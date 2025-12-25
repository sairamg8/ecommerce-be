import { Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
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
  getResetPasswordToken(): Promise<ForgotPasswordRes>;
}

export interface AuthResponse {
  data: {
    id: Types.ObjectId;
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
  userId: Types.ObjectId;
}

export interface ForgotPasswordRes {
  success: boolean;
  data: {
    message: string;
  };
}

export interface ResetPasswordRes extends AuthResponse {
  success: boolean;
}
