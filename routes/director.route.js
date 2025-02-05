const express = require("express");
const directorRouter = express.Router();
const Models = require("../public/models.js");

const Movie = Models.Movie;

const passport = require("passport");
require("../passport.js");

/**
 * Sends information about a specific director when it recieves that directors name in the request parameters.
 *
 * @async
 * @param {*} req The director's name
 * @param {*} res A JSON object containing more information about the director with that name.
 */
directorRouter.get("/:Name", passport.authenticate("jwt", { session: false }), async (req, res) => {
    await Movie.findOne({ "Director.Name": req.params.Name })
        .then((movie) => {
            if (movie) {
                res.status(201).json(movie.Director);
            } else {
                res.status(404).send("No Director Found.");
            }
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("Error: " + error);
        });
});

module.exports = directorRouter;
