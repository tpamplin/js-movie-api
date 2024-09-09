const express = require("express");
const genreRouter = express.Router();
const Models = require("../public/models.js");

const Movie = Models.Movie;

//Returns a JSON object containing information about a specific director.
genreRouter.get("/:Name", async (req, res) => {
    await Movie.findOne({ "Genre.Name": req.params.Name })
        .then((movie) => {
            if (movie) {
                res.status(201).json(movie.Genre);
            } else {
                res.status(404).send("No Genre Found.");
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

module.exports = genreRouter;
