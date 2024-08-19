const express = require("express");
const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/directors.controller");

const routerDirectors = express.Router();

routerDirectors.route("/").get(getAll).post(create);
routerDirectors.route("/:id").get(getOne).put(update).delete(remove);

module.exports = routerDirectors;
