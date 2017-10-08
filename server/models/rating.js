module.exports = (sequelize, DataTypes) => {
  const rating = sequelize.define('rating', {
    discountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "discount_id"
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id"
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    comment: {
      type: DataTypes.STRING
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    underscored: true
  });

  rating.associate = function(models) {
    models.rating.belongsTo(models.discount);
    models.rating.belongsTo(models.user);
  };

  return rating;
}