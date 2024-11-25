const express = require("express");
const userRouter = express.Router();
const Models = require("../public/models.js");

const { check, validationResult } = require("express-validator");

const Users = Models.User;

const passport = require("passport");
require("../passport.js");

const userController = require("../controllers/users.controller.js");

//Adds a new user to the list of users.
userRouter.post(
    "/",
    check("Username", "Username is required and must be at least 5 characters").isLength({ min: 5 }),
    check("Username", "Username contains non-alphanumeric characters -- not allowed.").isAlphanumeric(),
    check("Password", "Password is required.").not().isEmpty(),
    check("Email", "Email is not valid.").isEmail(),
    userController.addUser
);

//Updates the username to the new username the user has picked.
userRouter.put("/:Username", passport.authenticate("jwt", { session: false }), userController.updateUser);

//Adds a movie to a user's list of favorite movies.
userRouter.post("/:Username/favorites", passport.authenticate("jwt", { session: false }), userController.addFavorite);

//Removes a movie from a user's favorite list.
userRouter.delete(
    "/:Username/favorites",
    passport.authenticate("jwt", { session: false }),
    userController.deleteFavorite
);

//Removes a user from the list of users.
userRouter.delete("/:Username", passport.authenticate("jwt", { session: false }), userController.deleteUser);

module.exports = userRouter;
