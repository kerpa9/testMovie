const express = require("express");
const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/actors.controllers");

const routerActors = express.Router();

routerActors.route("/").get(getAll).post(create);
routerActors.route("/:id").get(getOne).put(update).delete(remove);

module.exports = routerActors;
