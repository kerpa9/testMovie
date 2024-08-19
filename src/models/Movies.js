const sequelize = require("../utils/connection");
const { DataTypes } = require("sequelize");

const Movies = sequelize.define("movies", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.TEXT,
  },

  synopsis: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  releaseYear: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
});

module.exports = Movies;
