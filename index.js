// Timothy Pamplin 2024
// Movie API responds to requests for information about movies and users

// import dependencies
import express from "express";
import morgan from "morgan";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
    let topMoviesRaw = fs.readFileSync(
        "./public/json/topMovies.json",
        "utf8",
        (err, data) => {
            if (err) throw err;
            return data;
        }
    );
    let topMovies = JSON.parse(topMoviesRaw);
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
