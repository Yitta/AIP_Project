module.exports = (sequelize, DataTypes) => {
  const student = sequelize.define('student', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
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
    institution: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expectedGraduationYear: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true,
    validate: {
      isUTSEmail() {
        if (!this.email.endsWith('uts.edu.au')) {
          throw('You must have a valid UTS email.')
        }
      }
    }
  });

  return discount;
}