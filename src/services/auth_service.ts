import { User } from "@/models/user/User";
import {
  AuthResponse,
  ForgotPasswordRes,
  JWTPayload,
  ResetPasswordRes,
} from "@/types/User.types";
import { AppError, BadRequestError, UnauthorizedError } from "@/utils/AppError";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import {
  ForgotPasswordT,
  ResetPasswordT,
  SingInT,
  SingUpT,
} from "@/utils/validation";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend("re_B6D6N4XQ_D7HWs7tn2BUQ2dga8tZko5BM");

const successMessage =
  "If an account exist with this email, you will receive password reset link.";

const sendResetPasswordEmail = async (email: string, url: string) => {
  const msg = {
    to: email,
    from: "onboarding@resend.dev",
    subject: "Reset Password Ecommerce",
    html: `
      <h1>Password Reset Request</h1>
      <p>You requested a password reset. Please click the link below to reset your password:</p>
      <a href="${url}" clicktracking=off>${url}</a>
      <p>This link will expire in 10 minutes.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `,
  };

  try {
    await resend.emails.send(msg);

    return {
      success: true,
      data: {
        message: successMessage,
      },
    };
  } catch (error: unknown) {
    const err = error as Error;
    return {
      success: false,
      data: {
        message: err?.message,
      },
    };
  }
};

export class AuthService {
  static async Signup(data: SingUpT): Promise<AuthResponse> {
    const isUserExist = await User.findOne({ email: data.email });

    if (isUserExist)
      throw new BadRequestError("User already exist with this email", 400);

    const user = await User.create(data);

    const payload: JWTPayload = {
      email: user.email,
      userId: user._id,
    };

    const token = generateAccessToken(payload);
    const refresh = generateRefreshToken(payload);

    user.refreshTokens.push(refresh);

    await user.save();

    return {
      data: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isVerified: user.isVerified,
      },
      accessToken: token,
      refreshToken: refresh,
    };
  }

  static async Signin(data: SingInT): Promise<AuthResponse> {
    const isUserExist = await User.findOne({ email: data.email }).select(
      "+password"
    );
    if (!isUserExist)
      throw new UnauthorizedError("Email / Password Incorrect", 401);

    const isPasswordMatch = await isUserExist.comparePassword(data.password);
    if (!isPasswordMatch)
      throw new UnauthorizedError("Email / Password Incorrect", 401);

    const accessToken = generateAccessToken({
      email: isUserExist?.email,
      userId: isUserExist._id,
    });

    const refreshToken = generateRefreshToken({
      email: isUserExist?.email,
      userId: isUserExist._id,
    });

    return {
      data: {
        email: isUserExist.email,
        firstName: isUserExist.firstName,
        id: isUserExist._id,
        isVerified: isUserExist.isVerified,
        lastName: isUserExist.lastName,
      },
      accessToken,
      refreshToken,
    };
  }

  static async ForgotPassword(
    data: ForgotPasswordT
  ): Promise<ForgotPasswordRes> {
    const { email } = data;

    if (!email) throw new BadRequestError("Please Provide an email");

    const isUserExist = await User.findOne({
      email: email.toLocaleLowerCase(),
    });

    if (!isUserExist) {
      return {
        success: true,
        data: {
          message: successMessage,
        },
      };
    }

    const resetToken = await isUserExist.getResetPasswordToken();
    await isUserExist.save({ validateBeforeSave: false });

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    const pass = await sendResetPasswordEmail(email, resetUrl);

    return pass;
  }

  static async ResetPassword(data: ResetPasswordT) {
    const { confirmPassword, password, resetToken } = data;

    if (!password || !confirmPassword) {
      throw new AppError("Please provide password and confirm password", 400);
    }

    console.log(password, confirmPassword, "Auth Service");

    if (password !== confirmPassword) {
      return {
        success: false,
        data: {
          message: "Passwords do not match",
        },
      };
    }

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) throw new AppError("Invalid or expired reset token", 400);

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return {
      success: true,
      message:
        "Password reset successful. You can now login with your new password.",
    };
  }
}
