const express = require("express");
const directorRouter = express.Router();

//Returns a JSON object containing information about a specific director.
directorRouter.get("/:name", (req, res) => {
    res.send("Successful GET request, returning data on a specific director.");
});

module.exports = directorRouter;
