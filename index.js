// Timothy Pamplin 2024
// Movie API responds to requests for information about movies and users

// import dependencies
require("dotenv").config();

const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"),
    path = require("path"),
    bodyParser = require("body-parser");

const app = express();

const router = require("./routes/route");
const movieRouter = require("./routes/movie.route");
const directorRouter = require("./routes/director.route");
const genreRouter = require("./routes/genre.route");
const userRouter = require("./routes/user.route");

app.use(bodyParser.json());

// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a",
});

app.use(morgan("combined", { stream: accessLogStream }));

app.use(express.static("public"));

app.use("/", router);
app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use("/directors", directorRouter);
app.use("/genres", genreRouter);

// Error handling.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("A wild Error has appeared!");
});

const port = process.env.PORT || 8080;

// deploy server
app.listen(port, () => {
    console.log(`Server Listening on port ${port}`);
});
