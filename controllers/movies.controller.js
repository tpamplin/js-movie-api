const Models = require("../public/models.js");

const Movie = Models.Movie;

module.exports = {
    getMovie: async (req, res) => {
        console.log("finding " + req.params.Title);
        await Movie.findOne({ Title: req.params.Title })
            .then((movie) => res.json(movie))
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    },

    getAll: async (req, res) => {
        console.log("Getting all movies.");
        await Movie.find()
            .then((movies) => res.status(200).json(movies))
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    },
};
