const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const { getApplications, saveApplication } = require("./controllers/applications");
const ApplicationsRepo = require("./repos/applicationsRepo");
const applicationsRepo = new ApplicationsRepo();

const PORT = process.env.APPLICATIONS_PORT;

const authenticateJWT = require("./authMiddleware");

const app = express();

app.use(cors());

app.use(bodyParser.json());

app.get("/applications", authenticateJWT, getApplications);

app.post("/applications", authenticateJWT, saveApplication);

app.get("/", (req, res) => {
  res.send("You reached the applications service");
});

app.listen(PORT, () => {
  console.log(`Applications service is running on port ${PORT}`);
});
