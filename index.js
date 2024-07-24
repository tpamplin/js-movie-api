// Timothy Pamplin 2024
// Movie API responds to requests for information about movies and users

// import Express
const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"),
    path = require("path");

const app = express();

const accessLogStream = fs.createwritestream(path.join(__dirname, "log.txt"), {
    flags: "a",
});

//json movies object
let topMovies = [
    {
        title: "The Princess Bride",
        year: "1987",
    },
    {
        title: "The Matrix",
        year: "1999",
    },
    {
        title: "Ip Man",
        year: "2008",
    },
    {
        title: "Pulp Fiction",
        year: "1994",
    },
    {
        title: "The Dark Knight",
        year: "2008",
    },
    {
        title: "Interstellar",
        year: "2014",
    },
    {
        title: "Shooter",
        year: "2007",
    },
    {
        title: "Taken",
        year: "2008",
    },
    {
        title: "Shaun of the Dead",
        year: "2004",
    },
    {
        title: "Spider-Man",
        year: "2002",
    },
];

// Logging
app.use(morgan("combined", { stream: accessLogStream }));

// Server Responses
app.get("/", (req, res) => {
    res.send("Welcome to my app!");
});

app.get("/movies", (req, res) => {
    res.json(topMovies);
});

app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("A wild Error has appeared!");
});

//deploy server
app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});
