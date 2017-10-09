module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('comment', {
    comment: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    underscored: true
  });

  comment.associate = function(models) {
    models.comment.belongsTo(models.discount);
    models.comment.belongsTo(models.user);
  };

  return comment;
}