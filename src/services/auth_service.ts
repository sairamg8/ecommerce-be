import { User } from "@/models/user/User";
import { AuthResponse, JWTPayload, SignupDTO } from "@/types/User.types";
import { generateAccessToken, generateRefreshToken } from "@/utils/jwt";

export class AuthService {
  static async Signup(data: SignupDTO): Promise<AuthResponse> {
    const isUserExist = await User.findOne({ email: data.email });

    if (isUserExist) throw new Error("User already exist with this email");

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
}
