const { loginController } = require("./auth");
const { usersRepository } = require("../core/UsersRepository");

describe("Auth Controller", () => {
  it("test test", async () => {
    expect(true).toBe(true);
  });
  it("should return 400 if request body is missing", async () => {
    const req = {
      body: null,
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Request body is missing");
  });
  it("should return 400 if username is missing", async () => {
    const req = {
      body: {
        username: null,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Username is missing");
  });
  it("should return 400 if password is missing", async () => {
    const req = {
      body: {
        username: "test",
        password: null,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    await loginController(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("Password is missing");
  });

  it("should return 200 if username and password are correct", async () => {
    usersRepository.matchUser = jest
      .fn()
      .mockReturnValue({ username: "test", password: "test" });
    const req = {
      body: {
        username: "test",
        password: "test",
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    await loginController(req, res);
    expect(usersRepository.matchUser).toHaveBeenCalledWith("test", "test");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});
