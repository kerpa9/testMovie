const request = require("supertest");
const app = require("../app");
const Movies = require("../models/Movies");
const Actors = require("../models/Actors");
const Directors = require("../models/Directors");
const Genres = require("../models/Genres");
require("../models");

let moviesId;
const BASE_URL = "/api/v1/movies";

const movies = {
  name: "El prisionero de azkaban",
  synopsis:
    "El día de su cumpleaños, Harry Potter descubre que es hijo de dos conocidos hechiceros, de los que ha heredado poderes mágicos.",
  releaseYear: 1985,
};

test("POST-> BASE_URL, should return statusCode 201, and res.body.name === movies.name", async () => {
  const res = await request(app).post(BASE_URL).send(movies);

  moviesId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movies.name);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app).get(BASE_URL);
  //   console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body[0].actors).toBeDefined();
  expect(res.body[0].actors).toHaveLength(0);
  expect(res.body[0].directors).toBeDefined();
  expect(res.body[0].directors).toHaveLength(0);
  expect(res.body[0].genres).toBeDefined();
  expect(res.body[0].genres).toHaveLength(0);
});

test("GET -> BASE_URL/moviesId, should return statusCode 200, and res.body.movies === movies.name", async () => {
  const res = await request(app).get(`${BASE_URL}/${moviesId}`);
  //   console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(movies.name);
  expect(res.body.actors).toBeDefined();
  expect(res.body.directors).toBeDefined();
  expect(res.body.genres).toBeDefined();
  expect(res.body.actors).toHaveLength(0);
  expect(res.body.directors).toHaveLength(0);
  expect(res.body.genres).toHaveLength(0);
});

test("PUT -> BASE_URL/moviesId, should return statusCode 200, and res.body.movies === moviesUpdate.name", async () => {
  const moviesUpdate = {
    name: "La piedra filosofal",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${moviesId}`)
    .send(moviesUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(moviesUpdate.name);
});

test("POST-> /BASE_URL/:id/actors,should return code 200, and res.body.length === 1", async () => {
  const actors = {
    firstName: "Harry",
    lastName: "Potter",
    nationality: "england",
    birthday: "1949-09-21",
  };

  const createActors = await Actors.create(actors);

  const res = await request(app)
    .post(`${BASE_URL}/${moviesId}/actors`)
    .send([createActors.id]);

  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].id).toBeDefined();
  expect(res.body[0].id).toBe(1);

  await createActors.destroy();
});

test("POST-> /BASE_URL/:id/directors,should return code 200, and res.body.length === 1", async () => {
  const directors = {
    firstName: "Richar",
    lastName: "Rollings",
    nationality: "england",
    birthday: "1949-09-21",
  };

  const createDirectors = await Directors.create(directors);

  const res = await request(app)
    .post(`${BASE_URL}/${moviesId}/directors`)
    .send([createDirectors.id]);

  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].id).toBeDefined();
  expect(res.body[0].id).toBe(1);

  await createDirectors.destroy();
});

test("POST-> /BASE_URL/:id/genres,should return code 200, and res.body.length === 1", async () => {
  const genres = {
    name: "Fiction",
  };

  const createGenres = await Genres.create(genres);

  const res = await request(app)
    .post(`${BASE_URL}/${moviesId}/genres`)
    .send([createGenres.id]);

  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body).toHaveLength(1);

  expect(res.body[0].id).toBeDefined();
  expect(res.body[0].id).toBe(1);

  await createGenres.destroy();
});

test("Delete -> BASE_URL/genresId, should return statusCode 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${moviesId}`);

  expect(res.statusCode).toBe(204);
});
