const express = require("express");
const movieRouter = express.Router();
const Models = require("../public/models.js");

const Movie = Models.Movie;

const passport = require("passport");
require("../passport.js");

const movieController = require("../controllers/movies.controller");

//Returns a JSON object containing a list of all movies.
movieRouter.get("/", passport.authenticate("jwt", { session: false }), movieController.getAll);

//Returns a JSON object containing all information about a specific movie.
movieRouter.get("/:Title", passport.authenticate("jwt", { session: false }), movieController.getMovie);

module.exports = movieRouter;
