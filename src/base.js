const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const bodyParser = require("body-parser");

const { getApplications, saveApplication } = require("./controllers/applications");
const ApplicationsGateway = require("./dbGateways/applicationsGateway");
const applicationsGateway = new ApplicationsGateway();

const PORT = process.env.APPLICATIONS_PORT;

const authenticateJWT = require("./authMiddleware");

const app = express();

app.use(bodyParser.json());

app.get("/applications", authenticateJWT, getApplications);

app.post("/applications", authenticateJWT, async (req, res) => {
  const { role } = req.user;
  if (role !== "admin") {
    return res.sendStatus(403);
  }

  const application = req.body;
  await applicationsGateway.saveApplication(application);
  res.send("Application added successfully");
});

app.get("/", (req, res) => {
  res.send("You reached the applications service");
});

app.listen(PORT, () => {
  console.log(`Applications service is running on port ${PORT}`);
});
