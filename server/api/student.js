const _ = require("lodash");
const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const studentHelper = require("../helpers/studentHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middlewares/authMiddleware");

const getStudentList = async (req, res) => {
  try {
    const data = await studentHelper.getStudentList();

    return res.send(data);
  } catch (err) {
    console.log(["getStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const getStudentDetail = async (req, res) => {
  try {
    const { token } = req.header;
    const { verifiedUser } = req.body;
    const email = verifiedUser.email;
    const data = await studentHelper.getStudentDetail({ token, email });

    return res.send(data);
  } catch (err) {
    console.log(["getStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const studentLecturer = async (req, res) => {
  try {
    const data = await studentHelper.getStudentLecturer();

    return res.send(data);
  } catch (err) {
    console.log(["studentLecturer", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const studentCourse = async (req, res) => {
  try {
    const data = await studentHelper.getStudentCourse();

    return res.send(data);
  } catch (err) {
    console.log(["studentCourse", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};
const addStudent = async (req, res) => {
  try {
    Validation.studentValidation(req.query);

    const data = await studentHelper.addStudent({ ...req.body });

    return res.send(data);
  } catch (err) {
    console.log(["addStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateStudent = async (req, res) => {
  try {
    Validation.studentValidation(req.body);

    const id = parseInt(req.params["student_id"]);
    const { fullname, nickname, lecturer_id } = req.body;

    const data = await studentHelper.updateStudent({
      id,
      fullname,
      nickname,
      lecturer_id,
    });
    return res.send(data);
  } catch (err) {
    console.log(["updateStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteStudent = async (req, res) => {
  try {
    const id = parseInt(req.params["student_id"]);
    const data = await studentHelper.deleteStudent({ id });
    return res.send(data);
  } catch (err) {
    console.log(["deleteStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/", getStudentList);
Router.get("/detail", Middleware.validateToken, getStudentDetail);
Router.post("/", addStudent);
Router.patch("/:student_id", updateStudent);
Router.delete("/:student_id", deleteStudent);
Router.get("/lecturer", studentLecturer);
Router.get("/course", studentCourse);

module.exports = Router;
