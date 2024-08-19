const express = require("express");
const routerActors = require("./actors.route");
const routerDirectors = require("./directors.route");
const routerGenres = require("./genres.route");
const routerMovies = require("./movies.route");
const router = express.Router();

// colocar las rutas aquí
router.use("/actors", routerActors);
router.use("/directors", routerDirectors);
router.use("/genres", routerGenres);
router.use("/movies", routerMovies);

module.exports = router;
