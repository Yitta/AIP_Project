module.exports = (sequelize, DataTypes) => {
  const discount = sequelize.define('discount', {
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "creator_id"
    },
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
      allowNull: false,
      field: 'is_online'
    },
    isInPerson: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_in_person'
    },
    isCoupon: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'is_coupon'
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
    lat: {
      type: DataTypes.DOUBLE
    },
    long: {
      type: DataTypes.DOUBLE
    },
    couponCodes: {
      type: DataTypes.STRING,
      field: 'coupon_codes'
    },
    description: {
      type: DataTypes.STRING
    },
    finePrint: {
      type: DataTypes.STRING,
      field: 'fine_print'
    },
    status: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
  }, {
    underscored: true
  });

  discount.associate = function(models) {
    models.discount.hasMany(models.rating, { onDelete: 'CASCADE' });
    models.discount.belongsTo(models.user, { foreignKey: 'creatorId', onDelete: 'CASCADE' });
  };

  return discount;
}