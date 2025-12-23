import { User } from "@/models/user/User";
import { AuthResponse, JWTPayload } from "@/types/User.types";
import { AppError } from "@/utils/AppError";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";
import { SingInT, SingUpT } from "@/utils/validation";

export class AuthService {
  static async Signup(data: SingUpT): Promise<AuthResponse> {
    const isUserExist = await User.findOne({ email: data.email });

    if (isUserExist)
      throw new AppError("User already exist with this email", 400);

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
    if (!isUserExist) throw new AppError("Email / Password Incorrect", 401);

    const isPasswordMatch = await isUserExist.comparePassword(data.password);
    if (!isPasswordMatch) throw new AppError("Email / Password Incorrect", 401);

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
}
