const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const users = require("./usersFile");

const PORT = process.env.AUTH_PORT;
const app = express();

app.use(bodyParser.json());
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const refreshTokens = [];

app.post("/login", (req, res) => {
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

  // Filter from the users array by username and password
  const user = users.find((user) => {
    return (user.username === username && user.password) === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );
    const refreshToken = jwt.sign(
      { username: user.username, role: user.role },
      refreshTokenSecret
    );
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } else {
    res.send("Username or password incorrect");
  }
});

// endpoint to get new token via refresh
app.post("/token", (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.sendStatus(401);
  }

  if (!refreshTokens.includes(token)) {
    return res.sendStatus(403);
  }

  jwt.verify(token, refreshTokenSecret, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret,
      { expiresIn: "20m" }
    );

    res.json({ accessToken });
  });
});

app.post("/logout", (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter((token) => t !== token);

  res.send("Logout successful");
});

app.get("/", (req, res) => {
  res.send("you reached the auth service");
});

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
