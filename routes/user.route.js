const express = require("express");
const userRouter = express.Router();
const Models = require("../public/models.js");

const Users = Models.User;

const userController = require("../controllers/users.controller.js");

//Adds a new user to the list of users.
userRouter.post("/", userController.getUser);

//Updates the username to the new username the user has picked.
userRouter.put("/:id/username", userController.updateUsername);

//Adds a movie to a user's list of favorite movies.
userRouter.post("/:id/favorites", userController.addFavorite);

//Removes a movie from a user's favorite list.
userRouter.delete("/:id/favorites/:title", userController.deleteFavorite);

//Removes a user from the list of users.
userRouter.delete("/:id", userController.deleteUser);

module.exports = userRouter;
