const express = require("express");
const movieRouter = express.Router();
var movies = require("../public/json/movies.json");

const movieController = require("../controllers/movies.controller");

//Returns a JSON object containing a list of all movies.
movieRouter.get("/", (req, res) => {
    //Reading topMovies from an external json file.
    res.json(movies);
});

//Returns a JSON object containing all information about a specific movie.
movieRouter.get("/:name", movieController.getMovie);

module.exports = movieRouter;
