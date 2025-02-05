const express = require("express");
const directorRouter = express.Router();
const Models = require("../public/models.js");

const Movie = Models.Movie;

const passport = require("passport");
require("../passport.js");

/**
 * GET Director
 *
 * Sends information about a specific director when it recieves that directors name in the request parameters.
 *
 * @function
 * @name GET /directors/:Name
 * @param {Object} req - The director's name
 *
 * @param {Object} res - A JSON object containing more information about the director with that name.
 *
 * @throws Sends 500 status response if there is an error.
 *
 * @async
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
