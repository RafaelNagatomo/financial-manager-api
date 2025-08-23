export class JwtConfig {
  static accessSecret = process.env.JWT_ACCESS_SECRET || "default_secret";
  static accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || "15m";
  static refreshSecret = process.env.JWT_REFRESH_SECRET || "default_refresh";
  static refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || "7d";
}
