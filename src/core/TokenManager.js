const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");

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
    if (!this.refreshTokens.includes(token)) {
      return false;
    }
    this.refreshTokens = this.refreshTokens.filter((t) => t !== token);
    return true
  }

  reset() {
    this.refreshTokens = [];
  }
}

const tokenManager = new TokenManager();

module.exports = tokenManager;