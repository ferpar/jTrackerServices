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
    res.status(400).send("Request body is missing");
    return;
  }

  if (!req.body.username) {
    res.status(400).send("Username is missing");
    return;
  }

  if (!req.body.password) {
    res.status(400).send("Password is missing");
    return;
  }

  // Read username and password from request body
  const { username, password } = req.body;

  // Filter from the users array by username and password;
  const user = await usersRepository.matchUser(username, password);

  if (user) {
    const accessToken = tokenManager.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );
    const refreshToken = tokenManager.sign(
      { username: user.username, role: user.role },
      refreshTokenSecret
    );
    tokenManager.addRefreshToken(refreshToken);

    res.status(200).json({ accessToken, refreshToken });
  } else {
    res.status(401).send("Username or password incorrect");
  }
};

const refreshTokenController = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  tokenManager.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = tokenManager.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({ accessToken });
  });
};

const logoutController = (req, res) => {
  if (!req.body.token) {
    res.status(400).send("Token is missing");
    return;
  }
  const { token } = req.body;
  const tokenFound = tokenManager.removeRefreshToken(token);
  if (!tokenFound) {
    res.status(200).send("Already logged out");
    return
  }

  res.send("Logout successful");
};

module.exports = { loginController, refreshTokenController, logoutController };
