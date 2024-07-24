// Timothy Pamplin 2024
// Movie API responds to requests for information about movies and users

// import Express
const express = require("express"),
    morgan = require("morgan");

const app = express();

// Logging
app.use(morgan("common"));

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
