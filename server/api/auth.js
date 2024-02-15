const Router = require("express").Router();

const Middleware = require("../middlewares/authMiddleware");
const Validation = require("../helpers/validationHelper");
const AuthHelper = require("../helpers/authHelper");
const GeneralHelper = require("../helpers/generalHelper");
const { response } = require("express");

const fileName = "server/api/auth.js";

const register = async (request, reply) => {
  try {
    Validation.registerValidation(request.body);

    const { fullname, nickname, email, password } = request.body;
    const response = await AuthHelper.registerUser({
      fullname,
      nickname,
      email,
      password,
    });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "register", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const login = async (request, reply) => {
  try {
    // Validation.loginValidation(request.body);

    const { email, password } = request.body;
    const response = await AuthHelper.login({ email, password });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const forgotpassword = async (request, reply) => {
  try {
    // Validation.loginValidation(request.body);
    // const id = parseInt(request.params["id"]);

    const { otp, newPassword, confirmPassword } = request.body;
    const response = await AuthHelper.forgotpassword({
      otp,
      newPassword,
      confirmPassword,
    });

    return reply.send(response);
  } catch (err) {
    console.log(request.body);
    console.log([fileName, "forgotpassword", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};
const generateOTP = async (request, reply) => {
  try {
    // Validation.loginValidation(request.body);
    // const id = parseInt(request.params["id"]);

    const { email } = request.body;
    // const email = verifiedUser.email;
    const response = await AuthHelper.generateOTP({
      email,
      //   newPassword,
      //   confirmPassword,
    });

    return reply.send(response);
  } catch (err) {
    console.log(request.body);
    console.log([fileName, "forgotpassword", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

const changepassword = async (request, reply) => {
  try {
    // Validation.loginValidation(request.body);
    const id = parseInt(request.params["id"]);

    const { oldPassword, newPassword } = request.body;
    const response = await AuthHelper.changepassword({
      id,
      newPassword,
      oldPassword,
    });

    return reply.send(response);
  } catch (err) {
    console.log([fileName, "changepassword", "ERROR"], { info: `${err}` });
    return reply.send(GeneralHelper.errorResponse(err));
  }
};

// eslint-disable-next-line arrow-body-style
const hello = async (request, reply) => {
  // SAMPLE API WITH JWT MIDDLEWARE
  return reply.send("HELLO");
};

Router.post("/register", register);
Router.post("/login", login);
Router.get("/hello", Middleware.validateToken, hello);
Router.post("/forgot-password", generateOTP);
Router.patch("/reset-password", forgotpassword);
Router.patch("/:id/change-password", Middleware.validateToken, changepassword);

module.exports = Router;
