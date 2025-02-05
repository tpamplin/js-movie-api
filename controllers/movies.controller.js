const Models = require("../public/models.js");

const Movie = Models.Movie;

module.exports = {
    /**
     * GET getMovie:
     *
     * Recieves a movie title and sends a JSON object with information about a movie which has that title.
     *
     * @function
     * @name GET /movies/:Title
     * @param {Object} req -Contains the title of the move that you want to find.
     *
     * @param {Object} res -A JSON object containing data about the movie you want.
     *
     * @throws Sends 500 status response if there is an error.\
     *
     * @async
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
     * GET getAll:
     *
     * Sends an array of ALL movie objects when requested
     *
     * @function
     * @name GET /movies/
     * @param {Object} req -Nothing really.
     *
     * @param {Object} res -A JSON object with all movies
     *
     * @throws Sends 500 status response if there is an error.
     *
     * @async
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
