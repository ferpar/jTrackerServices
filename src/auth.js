const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const tokenManager = require("./core/TokenManager");
const bodyParser = require("body-parser");

const { loginController, refreshTokenController } = require("./controllers/auth");

const PORT = process.env.AUTH_PORT;
const app = express();

app.use(bodyParser.json());
const refreshTokens = tokenManager.refreshTokens;


app.post("/login", loginController );

// endpoint to get new token via refresh
app.post("/token", refreshTokenController);

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
