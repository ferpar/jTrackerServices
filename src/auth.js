const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const {
  loginController,
  refreshTokenController,
  logoutController,
} = require("./controllers/auth");

const PORT = process.env.AUTH_PORT;
const app = express();

app.use(cors());

app.use(bodyParser.json());

app.post("/login", loginController);

app.post("/token", refreshTokenController);

app.post("/logout", logoutController);

app.get("/", (req, res) => {
  res.send("you reached the auth service");
});

app.listen(PORT, () => {
  console.log(`Auth service is running on port ${PORT}`);
});
