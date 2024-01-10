const { loginController, logoutController } = require("./auth");
const { usersRepository } = require("../core/UsersRepository");
const tokenManager = require("../core/TokenManager"); 

describe("Authentication", () => {
  beforeEach(() => {
    tokenManager.reset();
  })
  describe("Login Controller", () => {
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
    it("should return 401 if username or password are incorrect", async () => {
      usersRepository.matchUser = jest.fn().mockReturnValue(null);
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
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith("Username or password incorrect");
    });
  });
  describe("Logout Controller", () => {
    it("should return 200 if logout is successful", async () => {
      tokenManager.addRefreshToken("test");
      const req = {
        body: {
          token: "test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      await logoutController(req, res);
      expect(res.send).toHaveBeenCalledWith("Logout successful");
    })
    it("should return 400 if token is missing", async () => {
        const req = {
            body: {
            token: null,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await logoutController(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith("Token is missing");
    })
    it("should say already logged out if refresh token not found", async () => {
        const req = {
            body: {
            token: "test",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await logoutController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith("Already logged out");
    })
    it("should remove refresh token from token manager", async () => {
        tokenManager.addRefreshToken("test")
        const req = {
            body: {
            token: "test",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        await logoutController(req, res);
        expect(tokenManager.refreshTokens).toEqual([])
        })
  })
});
