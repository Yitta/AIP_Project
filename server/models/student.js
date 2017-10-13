module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['female', 'male', 'other']
    },
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    levelOfStudy: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['undergraduate', 'postgraduate']
    },
    expectedGraduationYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true
  });

  student.associate = function(models) {
    models.student.belongsTo(models.user);
  };

  return student;
}