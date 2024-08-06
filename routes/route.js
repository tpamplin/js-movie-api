const express = require("express");
const router = express.Router();
// var movies = require("./public/json/movies.json");

//default
router.get("/", (req, res) => {
    res.send("Welcome to my api!");
});

module.exports = router;
