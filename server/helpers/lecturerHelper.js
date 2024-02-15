const db = require("../../models");

const getLecturerList = async () => {
  let lecturerList = await db.lecturer.findAll({
    // attributes: ["id", "course_name"],
  });

  return Promise.resolve({ message: "Get Lecturer List", lecturerList });
};

module.exports = {
  getLecturerList,
};
