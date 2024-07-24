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
// Logging
app.use(morgan("combined", { stream: accessLogStream }));

// Server Responses
app.get("/", (req, res) => {
    res.send("Welcome to my app!");
});

app.get("/documentation", (req, res) => {
    res.sendFile("public/documentation.html", { root: __dirname });
});

//deploy server
app.listen(8080, () => {
    console.log("Your app is listening on port 8080.");
});
