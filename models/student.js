"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class student extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      student.belongsTo(models.lecturer, {
        as: "lecturer",
        foreignKey: "lecturer_id",
      });

      student.hasMany(models.studentcourse, {
        as: "student",
        foreignKey: "student_id",
      });
    }
  }
  student.init(
    {
      fullname: DataTypes.STRING,
      nickname: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      otp: DataTypes.INTEGER,
      lecturer_id: DataTypes.INTEGER,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "student",
    }
  );
  return student;
};
