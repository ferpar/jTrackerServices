const { 
  loginController, 
  logoutController,
  refreshTokenController
} = require("./auth");
const { usersRepository } = require("../core/UsersRepository");
const tokenManager = require("../core/TokenManager"); 

describe("Authentication", () => {
  describe("Login Controller", () => {
    it("should return 400 if request body is missing", async () => {
      const req = {
        body: null,
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      await loginController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Request body is missing",
          status: 400
        }
      })
    });
    it("should return 400 if username is missing", async () => {
      const req = {
        body: {
          username: null,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await loginController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Username is missing",
          status: 400
        }
      });
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
        json: jest.fn(),
      };
      await loginController(req, res);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Password is missing",
          status: 400
        }
      });
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
        json: jest.fn(),
      };
      await loginController(req, res);
      expect(usersRepository.matchUser).toHaveBeenCalledWith("test", "test");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        result: {
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          username: "test",
          message: "Login successful",
        },
      });
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
        json: jest.fn(),
      };
      await loginController(req, res);
      expect(usersRepository.matchUser).toHaveBeenCalledWith("test", "test");
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Username or password incorrect",
          status: 401
        }
      });
    });
  });
  describe("Refresh Token Controller", () => {
    it("should return 401 if token is missing", async () => {
      const req = {
        body: {
          token: null,
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await refreshTokenController(req, res);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Refresh token is missing",
          status: 401
        }
      });
    })
    it("should return 403 if refresh token is not valid", async () => {
      const req = {
        body: {
          token: "test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await refreshTokenController(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "Refresh token is not valid",
          status: 403
        }
      });
    })
    it("should return 403 if token signature is not valid", async () => {
      tokenManager.addRefreshToken("test");
      const req = {
        body: {
          token: "test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      tokenManager.verify = jest.fn().mockImplementation((token, secret, cb) => {
        cb(true, null);
      });
      await refreshTokenController(req, res);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        result: {
          message: "token signature not valid",
          status: 403
        }
      });
    })
  })
  describe("Logout Controller", () => {
    beforeEach(() => {
      tokenManager.reset();
    })
    it("should return 200 if logout is successful", async () => {
      tokenManager.addRefreshToken("test");
      const req = {
        body: {
          token: "test",
        },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      await logoutController(req, res);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        result: {
          message: "Logout successful",
          status: 200
        }
      });
    })
    it("should return 400 if token is missing", async () => {
        const req = {
            body: {
            token: null,
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await logoutController(req, res);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
          success: false,
          result: {
            message: "Token is missing",
            status: 400
          }
        });
    })
    it("should say already logged out if refresh token not found", async () => {
        const req = {
            body: {
            token: "test",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        await logoutController(req, res);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          success: true,
          result: {
            message: "Already logged out",
            status: 200
          }
        });
    })
    it("should remove refresh token from token manager", async () => {
      // arrange
        tokenManager.addRefreshToken("test")
        const req = {
            body: {
            token: "test",
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        // act
        await logoutController(req, res);
        // assert
        expect(tokenManager.refreshTokens).toEqual([])
        })
  })
});
