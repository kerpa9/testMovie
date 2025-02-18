const catchError = require("../utils/catchError");
const Genres = require("../models/Genres");
const Movies = require("../models/Movies");

const getAll = catchError(async (req, res) => {
  const results = await Genres.findAll();
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Genres.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genres.findByPk(id);
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genres.destroy({ where: { id } });
  if (!result) return res.sendStatus(404);
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Genres.update(req.body, {
    where: { id },
    returning: true,
  });
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});

const setGenres = catchError(async (req, res) => {
  const { id } = req.params,
    genre = await Movies.findByPk(id);
  await genre.setGenres(req.body);
  const genres = await genre.getGenres();
  return res.json(genres);
});

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setGenres,
};
