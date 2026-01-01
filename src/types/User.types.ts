export interface AuthResponse {
  data: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    is_verified: boolean;
  };
  accessToken: string;
  refreshToken: string;
}

export interface JWTPayload {
  email: string;
  userId: number;
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
