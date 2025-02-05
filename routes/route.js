const express = require("express");
const router = express.Router();
// var movies = require("./public/json/movies.json");

/**
 * Default route. not very useful
 *
 * @param {*} req None
 * @param {*} res Simple confirmation response.
 */
router.get("/", (req, res) => {
    res.send("Welcome to my api!");
});

module.exports = router;
