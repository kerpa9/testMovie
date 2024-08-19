const express = require("express");
const {
  getAll,
  create,
  getOne,
  update,
  remove,
} = require("../controllers/movies.controllers");
const { setActors } = require("../controllers/actors.controllers");
const { setDirectors } = require("../controllers/directors.controller");
const { setGenres } = require("../controllers/genre.controller");

const routerMovies = express.Router();

routerMovies.route("/").get(getAll).post(create);
routerMovies.route("/:id").get(getOne).put(update).delete(remove);

//movies/:id/genres
routerMovies.route("/:id/genres").post(setGenres);

//movies/:id/actors
routerMovies.route("/:id/actors").post(setActors);

//movies/:id/directors
routerMovies.route("/:id/directors").post(setDirectors);
module.exports = routerMovies;
