const dotenv = require("dotenv");
dotenv.config();
const { usersRepository } = require("../core/UsersRepository");
const tokenManager = require("../core/TokenManager");

const accessTokenSecret = tokenManager.accessTokenSecret;
const refreshTokenSecret = tokenManager.refreshTokenSecret;
const refreshTokens = tokenManager.refreshTokens;

const loginController = async (req, res) => {
  // handling errors
  if (!req.body) {
    res.status(400).json({
      success: false,
      result: {
        message: "Request body is missing",
        status: 400,
      },
    });
    return;
  }

  if (!req.body.email) {
    res.status(400).json({
      success: false,
      result: {
        message: "Email is missing",
        status: 400,
      },
    });
    return;
  }

  if (!req.body.password) {
    res.status(400).json({
      success: false,
      result: {
        message: "Password is missing",
        status: 400,
      },
    });
    return;
  }

  // Read email and password from request body
  const { email, password } = req.body;

  // Filter from the users array by email and password;
  const user = await usersRepository.matchUser(email, password);

  if (user) {
    const accessToken = tokenManager.sign(
      { email: user.email, role: user.role, userId: user.userId },
      accessTokenSecret,
      { expiresIn: "20m" }
    );
    const refreshToken = tokenManager.sign(
      { email: user.email, role: user.role, userId: user.userId },
      refreshTokenSecret
    );
    tokenManager.addRefreshToken(refreshToken);

    res.status(200).json({
      success: true,
      result: {
        token: accessToken,
        refreshToken,
        email: user.email,
        message: "Login successful",
        status: 200,
      },
    });
  } else {
    res.status(401).json({
      success: false,
      result: {
        message: "Email or password incorrect",
        status: 401,
      },
    });
  }
};

const refreshTokenController = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(401).json({
      success: false,
      result: {
        message: "Refresh token is missing",
        status: 401,
      },
    });
  }

  if (!refreshTokens.includes(token)) {
    return res.status(403).json({
      success: false,
      result: {
        message: "Refresh token is not valid",
        status: 403,
      },
    });
  }

  tokenManager.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        result: {
          message: "token signature not valid",
          status: 403,
        },
      });
    }
    const accessToken = tokenManager.sign(
      { email: user.email, role: user.role, userId: user.userId },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({ accessToken });
  });
};

const logoutController = (req, res) => {
  if (!req.body.token) {
    res.status(400).json({
      success: false,
      result: {
        message: "Token is missing",
        status: 400,
      },
    });
    return;
  }
  const { token } = req.body;
  const tokenFound = tokenManager.removeRefreshToken(token);
  if (!tokenFound) {
    res.status(200).json({
      success: true,
      result: {
        message: "Already logged out",
        status: 200,
      },
    });
    return;
  }

  res.json({
    success: true,
    result: {
      message: "Logout successful",
      status: 200,
    },
  });
};

module.exports = { loginController, refreshTokenController, logoutController };
