const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true,
      unique: true
    },
    password: {
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
      field: 'account_type',
      values: ['student', 'business', 'admin']
    },
    businessName: {
      type: DataTypes.STRING,
      field: "business_name"
    }
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

  user.prototype.getUser = function() {
    var user = this.toJSON();
    delete user.password;
    return user;
  };

  user.prototype.generateHash = function(password) {
    this.password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    return this;
  };

  user.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  user.associate = function(models) {
    models.user.hasMany(models.rating);
  };

  return user;
}
