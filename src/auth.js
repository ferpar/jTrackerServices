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

app.post("/login", (req, res) => {
  // Read username and password from request body
  if (!req.body) {
    res.status(400).send("Request body is missing");
  }

  if (!req.body.username) {
    res.status(400).send("Username is missing");
  }

  if (!req.body.password) {
    res.status(400).send("Password is missing");
  }

  const { username, password } = req.body;

  // Filter from the users array by username and password
  const user = users.find((user) => {
    return (user.username === username && user.password) === password;
  });

  if (user) {
    const accessToken = jwt.sign(
      { username: user.username, role: user.role },
      accessTokenSecret
    );

    res.json({ accessToken });
  } else {
    res.send("Username or password incorrect");
  }
});

app.get("/", (req, res) => {
  res.send("you reached the auth service");
});

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
