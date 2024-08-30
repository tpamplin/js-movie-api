var movies = require("../public/json/movies.json");

module.exports = {
    getMovie: (req, res) => {
        console.log(req.params.name);
        res.json(
            movies.find((movie) => {
                console.log(movie.name);
                return movie.name === req.params.name;
            })
        );
    },

    getAll: (req, res) => {
        console.log("Getting all movies.");
    },
};
