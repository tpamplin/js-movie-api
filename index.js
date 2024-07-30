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

// Server Responses
app.get("/", (req, res) => {
    res.send("Welcome to my app!");
});

app.get("/movies", (req, res) => {
    //Reading topMovies from an external json file.
    var topMovies = require("./public/json/topMovies.json");
    res.json(topMovies);
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
