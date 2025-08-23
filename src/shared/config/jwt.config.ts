export class JwtConfig {
  static secret = process.env.JWT_SECRET || "default_secret";
  static expiresIn = process.env.JWT_EXPIRES_IN || "15m";
  static refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
}
