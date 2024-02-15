const _ = require("lodash");
const Router = require("express").Router();

const Validation = require("../helpers/validationHelper");
const lecturerHelper = require("../helpers/lecturerHelper");
const GeneralHelper = require("../helpers/generalHelper");
const Middleware = require("../middlewares/authMiddleware");

const getLecturerList = async (req, res) => {
  try {
    const data = await lecturerHelper.getLecturerList();

    return res.send(data);
  } catch (err) {
    console.log(["getStudent", "ERROR"], { info: `${err}` });
    return res.send(GeneralHelper.errorResponse(err));
  }
};

Router.get("/", getLecturerList);
// Router.get("/detail", Middleware.validateToken, getStudentDetail);
// Router.post("/", addStudent);
// Router.patch("/:student_id", updateStudent);
// Router.delete("/:student_id", deleteStudent);
// Router.get("/lecturer", studentLecturer);
// Router.get("/course", studentCourse);

module.exports = Router;
