"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class studentcourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      studentcourse.belongsTo(models.course, {
        as: "course",
        foreignKey: "course_id",
      });
      studentcourse.belongsTo(models.student, {
        as: "student",
        foreignKey: "student_id",
      });
    }
  }
  studentcourse.init(
    {
      student_id: DataTypes.INTEGER,
      course_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "studentcourse",
    }
  );
  return studentcourse;
};
