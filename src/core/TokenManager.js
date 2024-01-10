const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

const expiresIn = "20m";

class TokenManager {
  accessTokenSecret
  refreshTokenSecret 
  refreshTokens
  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
    this.refreshTokens = []
  }

  sign(payload, secret, options) {
    return jwt.sign(payload, secret, options);
  }

  verify(token, secret, callback) {
    return jwt.verify(token, secret, callback);
  }

  addRefreshToken(token) {
    this.refreshTokens.push(token);
  }

  removeRefreshToken(token) {
    this.refreshTokens = this.refreshTokens.filter((t) => t !== token);
  }
}

const tokenManager = new TokenManager();

module.exports = tokenManager;