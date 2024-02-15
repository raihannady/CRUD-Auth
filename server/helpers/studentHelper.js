const db = require("../../models");

const getStudentList = async () => {
  let studentList = await db.student.findAll({
    attributes: ["id", "fullname", "nickname", "email", "lecturer_id"],
  });

  return Promise.resolve({ message: "Get Student List", studentList });
};

const getStudentDetail = async (dataObject) => {
  const { email } = dataObject;
  let studentList = await db.student.findOne({
    where: { email: email },
    // attributes: ["id", "fullname", "nickname"],
  });

  return Promise.resolve({ message: "Get Student List", studentList });
};

const getStudentLecturer = async () => {
  let studentLecturerList = await db.student.findAll({
    include: ["lecturer"],
    // attributes: ["id", "fullname", "nickname"],
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

const addStudent = async (dataObject) => {
  const { lecturer_id, fullname, nickname } = dataObject;
  const result = await db.student.create({ lecturer_id, fullname, nickname });

  return Promise.resolve({ message: "Add data success", result });
};

const updateStudent = async (dataObject) => {
  const { id, fullname, nickname, lecturer_id } = dataObject;
  const message = "Update data success";
  await db.student.update(
    {
      fullname,
      nickname,
      lecturer_id,
    },
    { where: { id: id } }
  );

  return Promise.resolve({
    message,
    result: { fullname, nickname, lecturer_id },
  });
};

const deleteStudent = async (dataObject) => {
  const { id } = dataObject;
  await db.student.destroy({ where: { id: id } });

  return Promise.resolve({ message: "Delete data success" });
};

module.exports = {
  getStudentList,
  getStudentDetail,
  addStudent,
  deleteStudent,
  updateStudent,
  getStudentLecturer,
  getStudentCourse,
};
