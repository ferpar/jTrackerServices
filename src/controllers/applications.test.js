const { applicationsService } = require("../services/ApplicationsService");
const FakeApplicationsRepo = require("../repos/fakeApplicationsRepo");
const { getApplicationsStub } = require("../testTools/getApplicationsStub");
const { getApplications, saveApplication } = require("./applications");
describe("Applications", () => {
  let fakeApplicationsRepo;
  beforeEach(() => {
    jest.clearAllMocks();
    console.error = jest.fn(); 
    fakeApplicationsRepo = new FakeApplicationsRepo();
    // inject the fakeApplication      sendStatus: jest.fn(),sRepo into the applicationsService
    applicationsService.applicationsRepo = fakeApplicationsRepo;
  });
  describe("get Applications", () => {
    it("should return applications", async () => {
      // arrange
      const req = {
        user: {
          userId: 1,
        },
      };
      const res = {
        json: jest.fn(),
      };
      // modify the getApplications method of the fakeApplicationsRepo to return the stubbed applications
      fakeApplicationsRepo.getApplications = jest
        .fn()
        .mockReturnValue(getApplicationsStub());
      // act
      await getApplications(req, res);
      // assert
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        result: {
          message: "Applications returned successfully",
          status: 200,
          data: getApplicationsStub(),
        },
      });
    });
    it("should return a 403 if the user is not logged in", async () => {
      // arrange
      const req = {
        user: undefined,
      };
      const res = {
        sendStatus: jest.fn(),
      };
      // act
      await getApplications(req, res);
      // assert
      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });
    it("should return a 500 if an error occurs", async () => {
      // arrange
      const req = {
        user: {
          userId: 1,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      fakeApplicationsRepo.getApplications = jest
        .fn()
        .mockImplementation(() => {
          throw new Error();
        });
      // act
      await getApplications(req, res);
      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Internal server error",
          status: 500,
        },
      });
    });
  });
  describe("save new job Application", () => {
    it("should return a 400 if the request body is missing", async () => {
      // arrange
      const req = {
        user: {
          userId: 1,
        },
        body: undefined,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn(),
      };
      // act
      await saveApplication(req, res);
      // assert
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Request body is missing",
          status: 400,
        },
      });
    });
    it("should return a 403 if the user is not logged in", async () => {
      // arrange
      const req = {
        user: undefined,
        body: {},
      };
      const res = {
        sendStatus: jest.fn(),
      };
      // act
      await saveApplication(req, res);
      // assert
      expect(res.sendStatus).toHaveBeenCalledWith(403);
    });
    it("should return a 200 if the application is saved successfully", async () => {
      // arrange
      const req = {
        user: {
          userId: 1,
        },
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn(),
      };
      // act
      await saveApplication(req, res);
      // assert
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        result: {
          message: "Application added successfully",
          status: 200,
        },
      });
    });
    it("should return a 500 if an error occurs", async () => {
      // arrange
      const req = {
        user: {
          userId: 1,
        },
        body: {},
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn(),
      };
      fakeApplicationsRepo.saveApplication = jest
        .fn()
        .mockImplementation(() => {
          throw new Error();
        });
      // act
      await saveApplication(req, res);
      // assert
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Internal server error",
          status: 500,
        },
      });
    });
    it("should call the saveApplication method of the applicationsRepo with the applicationDto", async () => {
      // arrange
      const req = {
        user: {
          userId: 1,
        },
        body: { test: "test" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        sendStatus: jest.fn(),
      };
      const saveApplicationSpy = jest.spyOn(
        fakeApplicationsRepo,
        "saveApplication"
      );
      // act
      await saveApplication(req, res);
      // assert
      expect(saveApplicationSpy).toHaveBeenCalledWith({...req.body, userId: 1});
    });
  });
});
