const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    accountType: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ['student', 'business', 'admin']
    },
  }, {
    underscored: true,
    validate: {
      isUTSEmail() {
        if (this.accountType === 'student' && !this.email.endsWith('uts.edu.au')) {
          throw('You must have a valid UTS email.')
        }
      }
    }
  });

  user.prototype.setPassword = function(password) {
    this.passwordHash = bcrypt.hashSync(password);
    return this;
  };
  user.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.passwordHash);
  };

  user.associate = function(models) {
    models.user.hasMany(models.comment);
  };

  return user;
}