const { applicationsService } = require("../services/ApplicationsService");

const getApplications = async (req, res) => {
  // this controller is protected by the authenticateJWT middleware
  const user = req?.user;
  const userId = user?.userId;
  if (!user || !userId) {
    return res.sendStatus(403);
  }
  try {
    const applications = await applicationsService.getApplications(userId);
    res.json({
      success: true,
      result: {
        message: "Applications returned successfully",
        status: 200,
        data: applications,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      result: {
        message: "Internal server error",
        status: 500,
      },
    });
  }
};

const saveApplication = async (req, res) => {
  // this controller is protected by the authenticateJWT middleware
  const user = req?.user;
  const userId = user?.userId;
  if (!user || !userId) {
    return res.sendStatus(403);
  }

  // const { role } = req.user;
  // if (role !== "admin") {
  //   return res.sendStatus(403);
  // }

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
  try {
    const application = req.body;
    await applicationsService.saveApplication({...application, userId});
    res.status(200).json({
      success: true,
      result: {
        message: "Application added successfully",
        status: 200,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      result: {
        message: "Internal server error",
        status: 500,
      },
    });
  }
};

const deleteApplicationById = async (req, res) => {
  // this controller is protected by the authenticateJWT middleware
  const user = req?.user;
  const userId = user?.userId;
  if (!user || !userId) {
    return res.sendStatus(403);
  }

  if (!req.params?.id) {
    res.status(400).json({
      success: false,
      result: {
        message: "Request params are missing",
        status: 400,
      },
    });
    return;
  }
  try {
    const applicationId = req.params.id;
    // find application by id
    const application = await applicationsService.findApplicationById(applicationId);
    if (!application) {
      return res.status(404).send("Application not found");
    }
    // check userId matchers, db is not case sensitive => userid === userId
    if (application.userid !== userId) {
      return res.status(403).send("Cannot delete another user's application");
    }
    await applicationsService.deleteApplicationById(applicationId);
    res.status(200).json({
      success: true,
      result: {
        message: "Application deleted successfully",
        status: 200,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      success: false,
      result: {
        message: "Internal server error",
        status: 500,
      },
    });
  }
}

module.exports = {
  getApplications,
  saveApplication,
  deleteApplicationById
};
