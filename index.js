// Timothy Pamplin 2024
// Movie API responds to requests for information about movies and users

// import dependencies
require("dotenv").config();

const express = require("express"),
    morgan = require("morgan"),
    fs = require("fs"),
    path = require("path"),
    bodyParser = require("body-parser"),
    cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(express.json());

const mongoose = require("mongoose");

// mongoose.connect("mongodb://localhost:27017/myFlixDB", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, "log.txt"), {
    flags: "a",
});
app.use(morgan("combined", { stream: accessLogStream }));

app.use(cors());

// let allowedOrigins = ["http://localhost:1234"];

// app.use(
//     cors({
//         origin: (origin, callback) => {
//             if (!origin) return callback(null, true);
//             if (allowedOrigins.indexOf(origin) === -1) {
//                 let message = "The CORS policy for this application doesn't allow access from origin " + origin;
//                 return callback(new Error(message), false);
//             }
//             return callback(null, true);
//         },
//     })
// );

const passport = require("passport");
require("./passport");

const router = require("./routes/route");
const movieRouter = require("./routes/movie.route");
const directorRouter = require("./routes/director.route");
const genreRouter = require("./routes/genre.route");
const userRouter = require("./routes/user.route");

let auth = require("./routes/auth")(app);

app.use("/", router);
app.use("/movies", movieRouter);
app.use("/users", userRouter);
app.use("/directors", directorRouter);
app.use("/genres", genreRouter);

app.use(express.static("public"));

// Error handling.
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("A wild Error has appeared!");
});

const port = process.env.PORT || 8080;

// deploy server
app.listen(port, "0.0.0.0", () => {
    console.log(`Server Listening on port ${port}`);
});
