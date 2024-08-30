const express = require("express");
const genereRouter = express.Router();

//Returns a JSON object containing data about a specific genre.
genereRouter.get("/:name", (req, res) => {
    res.send("Successful GET request, returning data on a specific genre.");
});

module.exports = genereRouter;
