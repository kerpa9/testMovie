const Actor = require("./Actors");
const Director = require("./Directors");
const Genre = require("./Genres");
const Movie = require("./Movies");

Movie.belongsToMany(Actor, { through: "actorMovies" });
Actor.belongsToMany(Movie, { through: "actorMovies" });

Director.belongsToMany(Movie, { through: "directorsMovie" });
Movie.belongsToMany(Director, { through: "directorsMovie" });

Genre.belongsToMany(Movie, { through: "genresMovie" });
Movie.belongsToMany(Genre, { through: "genresMovie" });
