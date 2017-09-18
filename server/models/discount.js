module.exports = (sequelize, DataTypes) => {
  const discount = sequelize.define('discount', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discount: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isOnline: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isInPerson: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isCoupon: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    start: {
      type: DataTypes.DATEONLY
    },
    end: {
      type: DataTypes.DATEONLY
    },
    url: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    couponCodes: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING
    },
    finePrint: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true,
  });

  discount.associate = function(models) {
    models.discount.hasMany(models.comment);
  };

  return discount;
}