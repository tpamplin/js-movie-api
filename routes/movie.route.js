const express = require("express");
const movieRouter = express.Router();
const Models = require("../public/models.js");

const Movie = Models.Movie;

const movieController = require("../controllers/movies.controller");

//Returns a JSON object containing a list of all movies.
movieRouter.get("/", movieController.getAll);

//Returns a JSON object containing all information about a specific movie.
movieRouter.get("/:name", movieController.getMovie);

module.exports = movieRouter;
