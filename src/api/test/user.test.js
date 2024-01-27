jest.mock("bcryptjs");
jest.mock("jsonwebtoken");
jest.mock("../Models/user.model");
const bcrypt = require("bcryptjs");
const User = require("../Models/user.model");
const userController = require("../controllers/user.controller");

describe("register", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should create a new user", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);
    bcrypt.genSalt = jest.fn().mockResolvedValue("salt");
    bcrypt.hash = jest.fn().mockResolvedValue("hashedPassword");
    User.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue({
        _id: "userId",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      }),
    }));

    await userController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      status: "success",
      data: {
        id: "userId",
        name: "John Doe",
        email: "john@example.com",
        role: "user",
      },
    });
  });

  it("should return 409 if user already exists", async () => {
    User.findOne = jest.fn().mockResolvedValue({});

    await userController.register(req, res);

    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({
      errorMessage: "An account with this email already exists.",
    });
  });
});
describe("login", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: { email: "john@example.com", password: "password123" },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it("should login user successfully", async () => {
    User.findOne = jest.fn().mockResolvedValue({
      _id: "userId",
      email: "john@example.com",
      password: "hashedPassword",
      role: "user",
      name: "John Doe",
    });
    bcrypt.compare = jest.fn().mockResolvedValue(true);
    const jwt = require("jsonwebtoken");
    jwt.sign = jest.fn().mockReturnValue("token");

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ token: "token" });
  });

  it("should return 401 if user not found", async () => {
    User.findOne = jest.fn().mockResolvedValue(null);

    await userController.login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Invalid email or password.",
    });
  });
});
