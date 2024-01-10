const dotenv = require("dotenv");
dotenv.config();
const UsersGateway = require("../dbGateways/usersGateway");
const usersGateway = new UsersGateway();
const tokenManager = require("../core/TokenManager");

const accessTokenSecret = tokenManager.accessTokenSecret;
const refreshTokenSecret = tokenManager.refreshTokenSecret;
const refreshTokens = tokenManager.refreshTokens;

const loginController = async (req, res) => {
  // handling errors
  if (!req.body) {
    res.status(400).send("Request body is missing");
  }

  if (!req.body.username) {
    res.status(400).send("Username is missing");
  }

  if (!req.body.password) {
    res.status(400).send("Password is missing");
  }

  // Read username and password from request body
  const { username, password } = req.body;

  // Filter from the users array by username and password;
  const user = await usersGateway.matchUser(username, password);

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

    res.json({ accessToken, refreshToken });
  } else {
    res.send("Username or password incorrect");
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
  const { token } = req.body;
  tokenManager.removeRefreshToken(token);

  res.send("Logout successful");
};

module.exports = { loginController, refreshTokenController, logoutController };
