const sequelize = require("../utils/connection");
const { DataTypes } = require("sequelize");

const Actors = sequelize.define("actors", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  nationality: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  image: {
    type: DataTypes.TEXT,
  },

  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Actors;
