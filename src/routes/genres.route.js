const express = require("express");
const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/genre.controller");

const routerGenres = express.Router();

routerGenres.route("/").get(getAll).post(create);
routerGenres.route("/:id").get(getOne).put(update).delete(remove);

module.exports = routerGenres;
