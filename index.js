// Timothy Pamplin 2024
// Movie API responds to requests for information about movies and users

// import dependencies
const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"),
    path = require("path"),
    bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

//Load movies
var movies = require("./public/json/movies.json");

// Server Responses
//default
app.get("/", (req, res) => {
    res.send("Welcome to my api!");
});

//Returns a JSON object containing a list of all movies.
app.get("/movies", (req, res) => {
    //Reading topMovies from an external json file.
    res.json(movies);
});

//Returns a JSON object containing all information about a specific movie.
app.get("/movies/:name", (req, res) => {
    console.log(req.params.name);
    res.json(
        movies.find((movie) => {
            console.log(movie.name);
            return movie.name === req.params.name;
        })
    );
});

//Returns a JSON object containing data about a specific genre.
app.get("/genres/:name", (req, res) => {
    res.send("Successful GET request, returning data on a specific genre.");
});

//Returns a JSON object containing information about a specific director.
app.get("/directors/:name", (req, res) => {
    res.send("Successful GET request, returning data on a specific director.");
});

//Adds a new user to the list of users.
app.post("/users", (req, res) => {
    res.send("Successful POST request, adding a user to the list of users.");
});

//Updates the username to the new username the user has picked.
app.put("/users/:id/username", (req, res) => {
    res.send("Successful PUT request, updating a username.");
});

//Adds a movie to a user's list of favorite movies.
app.post("/users/:id/favorites", (req, res) => {
    res.send("Successful POST request, adding a movie to a user's favorites list.");
});

//Removes a movie from a user's favorite list.
app.delete("/users/:id/favorites/:title", (req, res) => {
    res.send("Successful DELETE request, removing a movie from user's favorites list.");
});

//Removes a user from the list of users.
app.delete("/users/:id", (req, res) => {
    res.send("Sucessful DELETE request, removing a user from the list of users.");
});

app.use(express.static("public"));

// Error handling.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("A wild Error has appeared!");
});

// deploy server
app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});
