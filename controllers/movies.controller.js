const Models = require("../public/models.js");

const Movie = Models.Movie;

module.exports = {
    /**
     * Recieves a movie title and sends a JSON object with information about a movie which has that title.
     *
     * @async
     * @param {*} req Contains the title of the move that you want to find.
     * @param {*} res A JSON object containing data about the movie you want.
     */
    getMovie: async (req, res) => {
        console.log("finding " + req.params.Title);
        await Movie.findOne({ Title: req.params.Title })
            .then((movie) => res.json(movie))
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    },

    /**
     * Sends an array of ALL movie objects when requested
     *
     * @async
     * @param {*} req Nothing really.
     * @param {*} res A JSON object with all movies
     */
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
