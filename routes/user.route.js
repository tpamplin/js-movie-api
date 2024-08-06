const express = require("express");
const userRouter = express.Router();

//Adds a new user to the list of users.
userRouter.post("/", (req, res) => {
    res.send("Successful POST request, adding a user to the list of users.");
});

//Updates the username to the new username the user has picked.
userRouter.put("/:id/username", (req, res) => {
    res.send("Successful PUT request, updating a username.");
});

//Adds a movie to a user's list of favorite movies.
userRouter.post("/:id/favorites", (req, res) => {
    res.send("Successful POST request, adding a movie to a user's favorites list.");
});

//Removes a movie from a user's favorite list.
userRouter.delete("/:id/favorites/:title", (req, res) => {
    res.send("Successful DELETE request, removing a movie from user's favorites list.");
});

//Removes a user from the list of users.
userRouter.delete("/:id", (req, res) => {
    res.send("Sucessful DELETE request, removing a user from the list of users.");
});

module.exports = userRouter;
