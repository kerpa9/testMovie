const request = require("supertest");
const app = require("../app");
const Genres = require("../models/Genres");
require("../models");

let genresId;
const BASE_URL = "/api/v1/genres";

const genres = {
  name: "Terror",
};

test("POST-> BASE_URL, should return statusCode 201, and res.body.name === genres.name", async () => {
  const res = await request(app).post(BASE_URL).send(genres);

  genresId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app).get(BASE_URL);
  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});

test("GET -> BASE_URL/genresId, should return statusCode 200, and res.body.genres === genres.name", async () => {
  const res = await request(app).get(`${BASE_URL}/${genresId}`);
  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genres.name);
});

test("PUT -> BASE_URL/genresId, should return statusCode 200, and res.body.genres === genresUpdate.name", async () => {
  const genresUpdate = {
    name: "action",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${genresId}`)
    .send(genresUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.name).toBe(genresUpdate.name);
});

test("Delete -> BASE_URL/genresId, should return statusCode 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${genresId}`);

  expect(res.statusCode).toBe(204);
});
