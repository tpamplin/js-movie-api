const express = require("express");
const genreRouter = express.Router();
const Models = require("../public/models.js");

const Movie = Models.Movie;

const passport = require("passport");
require("../passport.js");

/**
 * Takes the name of a specific genre, and finds a genre in the database with the same name.
 * Sends back a JSON object containing information about that genre.
 *
 * @async
 * @param {*} req The name of a genre
 * @param {*} res A JSON object containing all information about that genre.
 */
genreRouter.get("/:Name", passport.authenticate("jwt", { session: false }), async (req, res) => {
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
