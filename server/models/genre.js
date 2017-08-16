module.exports = (sequelize, DataTypes) => {
  const genre =  sequelize.define('genre', {
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      isUnique: true,
      primaryKey: true
    }
  }, {
    timestamps: false
  });

  genre.associate = (models) => {
    models.genre.belongsToMany(models.movie, { through: 'movieGenre', foreignKey: 'genreName', timestamps: false });
  }

  return genre;
}