"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      course.hasMany(models.studentcourse, {
        as: "course",
        foreignKey: "course_id",
      });
    }
  }
  course.init(
    {
      course_name: DataTypes.STRING,
      credits: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "course",
    }
  );
  return course;
};
