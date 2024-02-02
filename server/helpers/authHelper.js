const Boom = require("boom");
const bcrypt = require("bcryptjs");
const _ = require("lodash");
const jwt = require("jsonwebtoken");

const db = require("../../models");
const GeneralHelper = require("./generalHelper");

const jwtSecretToken = process.env.JWT_SECRET_TOKEN || "super_strong_key";
const jwtExpiresIn = process.env.JWT_EXPIRES_IN || "24h";
const fileName = "server/helpers/authHelper.js";
const salt = bcrypt.genSaltSync(10);

// eslint-disable-next-line arrow-body-style
const __hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};

// eslint-disable-next-line arrow-body-style
const __comparePassword = (payloadPass, dbPass) => {
  return bcrypt.compareSync(payloadPass, dbPass);
};

// eslint-disable-next-line arrow-body-style
const __generateToken = (data) => {
  return jwt.sign(data, jwtSecretToken, { expiresIn: jwtExpiresIn });
};

const registerUser = async (dataObject) => {
  const { fullname, nickname, email, password } = dataObject;

  try {
    const user = await db.student.findOne({
      where: { email },
    });
    if (!_.isEmpty(user)) {
      return Promise.reject(Boom.badRequest("EMAIL_HAS_BEEN_USED"));
    }

    const hashedPass = __hashPassword(password);

    await db.student.create({
      fullname,
      nickname,
      email,
      password: hashedPass,
    });

    return Promise.resolve({
      message: "Register Success",
      result: { fullname, nickname, email },
    });
  } catch (err) {
    console.log([fileName, "registerUser", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const login = async (dataObject) => {
  const { email, password } = dataObject;

  try {
    const user = await db.student.findOne({
      where: { email: email },
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    const isPassMatched = __comparePassword(password, user.password);
    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest("WRONG_CREDENTIALS"));
    }

    const token = __generateToken({
      fullname: user.fullname,
      email: user.email,
      nickname: user.nickname,
      password: user.password,
    });

    return Promise.resolve({ message: "Login Success", token });
  } catch (err) {
    console.log(email);
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const forgotpassword = async (dataObject) => {
  const { otp, newPassword, confirmPassword } = dataObject;

  try {
    const user = await db.student.findOne({
      where: { otp },
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    // const isPassMatched = __comparePassword(password, user.password);
    // if (!isPassMatched) {
    //   return Promise.reject(Boom.badRequest("WRONG_CREDENTIALS"));
    // }

    if (newPassword !== confirmPassword) {
      return Promise.reject(Boom.badRequest("PASSWORD_NOT_SAME"));
    } else if (otp !== otp) {
      return Promise.reject(Boom.badRequest("OTP_NOT_SAME"));
    }

    const hashedPass = __hashPassword(newPassword);

    await db.student.update(
      { otp: otp, password: hashedPass },
      { where: { otp: otp } }
    );

    return Promise.resolve({ message: "Change password success" });
  } catch (err) {
    // console.log(email);
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const generateOTP = async (dataObject) => {
  const { email } = dataObject;

  try {
    const user = await db.student.findOne({
      where: { email },
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    const createOTP = Math.floor(1000 + Math.random() * 9000);

    await db.student.update({ otp: createOTP }, { where: { email: email } });

    return Promise.resolve({ message: "Email Submitted", otp: createOTP });
  } catch (err) {
    console.log([fileName, "generateOTP", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

const changepassword = async (dataObject) => {
  const { id, newPassword, oldPassword } = dataObject;

  try {
    const user = await db.student.findOne({
      where: { id },
    });
    if (_.isEmpty(user)) {
      return Promise.reject(Boom.notFound("USER_NOT_FOUND"));
    }

    const isPassMatched = __comparePassword(oldPassword, user.password);
    if (!isPassMatched) {
      return Promise.reject(Boom.badRequest("WRONG_CREDENTIALS"));
    }

    const hashedPass = __hashPassword(newPassword);

    await db.student.update({ password: hashedPass }, { where: { id: id } });

    return Promise.resolve({ message: "Password Changed" });
  } catch (err) {
    // console.log(email);
    console.log([fileName, "login", "ERROR"], { info: `${err}` });
    return Promise.reject(GeneralHelper.errorResponse(err));
  }
};

module.exports = {
  registerUser,
  generateOTP,
  login,
  forgotpassword,
  changepassword,
};
