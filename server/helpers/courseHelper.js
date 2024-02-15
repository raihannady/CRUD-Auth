const db = require("../../models");

const getCourseList = async () => {
  let studentList = await db.course.findAll({
    // attributes: ["id", "course_name"],
  });

  return Promise.resolve({ message: "Get Course List", studentList });
};

const getCourseDetail = async (dataObject) => {
  const { id } = dataObject;
  let courseList = await db.course.findOne({
    where: { id },
    // attributes: ["course_name", "credits"],
  });

  return Promise.resolve({ message: "Get Course Detail", courseList });
};

const getStudentLecturer = async () => {
  let studentLecturerList = await db.student.findAll({
    include: ["lecturer"],
    attributes: ["id", "fullname", "nickname"],
  });

  return Promise.resolve({
    message: "Get Student Lecturer",
    studentLecturerList,
  });
};

const getStudentCourse = async () => {
  let studentCourse = await db.studentcourse.findAll({
    include: ["student", "course"],
    attributes: ["id"],
  });

  return Promise.resolve({ message: "Get Student Course", studentCourse });
};

const addCourse = async (dataObject) => {
  const { course_name, credits } = dataObject;
  const result = await db.course.create({ course_name, credits });

  return Promise.resolve({ message: "Add data success", result });
};

const updateCourse = async (dataObject) => {
  const { id, course_name, credits } = dataObject;
  const message = "Update data success";
  await db.course.update(
    {
      course_name,
      credits,
    },
    { where: { id: id } }
  );

  return Promise.resolve({
    message,
    result: { course_name, credits },
  });
};

const deleteCourse = async (dataObject) => {
  const { id } = dataObject;
  await db.course.destroy({ where: { id: id } });

  return Promise.resolve({ message: "Delete data success" });
};

module.exports = {
  getCourseList,
  getCourseDetail,
  addCourse,
  deleteCourse,
  updateCourse,
  //   getStudentLecturer,
  //   getStudentCourse,
};
