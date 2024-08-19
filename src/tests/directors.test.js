const request = require("supertest");
const app = require("../app");
const Directors = require("../models/Directors");
require("../models");

let directorsId;
const BASE_URL = "/api/v1/directors";

const directors = {
  firstName: "Richard",
  lastName: "Rollings",
  nationality: "england",
  birthday: "1949-09-21",
};

test("POST-> BASE_URL, should return statusCode 201, and res.body.firstName === directors.firstName ", async () => {
  const res = await request(app).post(BASE_URL).send(directors);

  directorsId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directors.firstName);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app).get(BASE_URL);
  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});

test("GET -> BASE_URL/directorsId, should return statusCode 200, and res.body.directors === directors.firstName", async () => {
  const res = await request(app).get(`${BASE_URL}/${directorsId}`);
  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directors.firstName);
});

test("PUT -> BASE_URL/actorsId, should return statusCode 200, and res.body.directors === directorsUpdate.firtsName", async () => {
  const directorsUpdate = {
    firstName: "Juan",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${directorsId}`)
    .send(directorsUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(directorsUpdate.firstName);
});

test("Delete -> BASE_URL/directorsId, should return statusCode 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${directorsId}`);

  expect(res.statusCode).toBe(204);
});
