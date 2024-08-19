require("../models");
const sequelize = require("../utils/connection");

const testMigrate = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB Reset 🤷‍♂️😁");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

testMigrate();
