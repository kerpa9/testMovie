const request = require("supertest");
const app = require("../app");
const Actors = require("../models/Actors");
require("../models");

let actorsId;
const BASE_URL = "/api/v1/actors";

const actors = {
  firstName: "Harry",
  lastName: "Potter",
  nationality: "england",
  birthday: "1949-09-21",
};

test("POST-> BASE_URL, should return statusCode 201, and res.body.firstName === actors.firstName ", async () => {
  const res = await request(app).post(BASE_URL).send(actors);

  actorsId = res.body.id;

  expect(res.status).toBe(201);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actors.firstName);
});

test("GET -> BASE_URL, should return statusCode 200, and res.body.length === 1", async () => {
  const res = await request(app).get(BASE_URL);
  console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
});

test("GET -> BASE_URL/actorsId, should return statusCode 200, and res.body.actors === actors.firstName", async () => {
  const res = await request(app).get(`${BASE_URL}/${actorsId}`);
  // console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actors.firstName);
});

test("PUT -> BASE_URL/actorsId, should return statusCode 200, and res.body.actors === actorsUpdate.name", async () => {
  const actorsUpdate = {
    firstName: "Juan",
  };

  const res = await request(app)
    .put(`${BASE_URL}/${actorsId}`)
    .send(actorsUpdate);

  expect(res.status).toBe(200);
  expect(res.body).toBeDefined();
  expect(res.body.firstName).toBe(actorsUpdate.firstName);
});

test("Delete -> BASE_URL/actorsId, should return statusCode 204", async () => {
  const res = await request(app).delete(`${BASE_URL}/${actorsId}`);

  expect(res.statusCode).toBe(204);
});
