module.exports = (sequelize, DataTypes) => {
  const movie = sequelize.define('movie', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      field: 'release_date'
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    synopsis: {
      type: DataTypes.TEXT('long')
    }
  });

  movie.associate = (models) => {
    models.movie.belongsToMany(models.genre, { through: 'movieGenre', timestamps: false });
  }

  return movie;
}
