const _ = require("lodash");
const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const courseHelper = require("../helpers/courseHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middlewares/authMiddleware");

const getCourseList = async (req, res) => {
  try {
    const data = await courseHelper.getCourseList();

    return res.send(data);
  } catch (err) {
    console.log(["getCourse", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const getCourseDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await courseHelper.getCourseDetail({ id });

    return res.send(data);
  } catch (err) {
    console.log(["getStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const addCourse = async (req, res) => {
  try {
    // Validation.registerValidation(req.body);

    const data = await courseHelper.addCourse({ ...req.body });

    return res.send(data);
  } catch (err) {
    console.log(["addCourse", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const updateCourse = async (req, res) => {
  try {
    // Validation.studentValidation(req.body);

    const id = parseInt(req.params["id"]);
    const { course_name, credits } = req.body;

    const data = await courseHelper.updateCourse({
      id,
      course_name,
      credits,
    });
    return res.send(data);
  } catch (err) {
    console.log(["updateCourse", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

const deleteCourse = async (req, res) => {
  try {
    const id = parseInt(req.params["id"]);
    const data = await courseHelper.deleteCourse({ id });
    return res.send(data);
  } catch (err) {
    console.log(["deleteCourse", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/", getCourseList);
Router.get("/detail/:id", getCourseDetail);
Router.post("/", addCourse);
Router.patch("/:id", updateCourse);
Router.delete("/:id", deleteCourse);

module.exports = Router;
