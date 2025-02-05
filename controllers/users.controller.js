const Models = require("../public/models.js");

const { check, validationResult } = require("express-validator");

const Users = Models.User;

module.exports = {
    /**
     * When called, this function will take the given user data and construct a user account and save it to the database.
     *
     * @async
     * @param {*} req The data sent by the user containing a username, password, email and birthday
     * @param {*} res The completed user data that will be sent back to the user.
     * @returns a message telling the user that a user with their username already exists if their username is taken.
     */
    addUser: async (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let hashedPassword = Users.hashPassword(req.body.Password);
        await Users.findOne({ Username: req.body.Username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + " already exists.");
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: hashedPassword,
                        Email: req.body.Email,
                        Birthday: req.body.Birthday,
                    })
                        .then((user) => {
                            res.status(201).json(user);
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).send("Error: " + error);
                        });
                }
            })
            .catch((error) => {
                console.error(error);
                res.status(500).send("Error: " + error);
            });
    },

    /**
     * Sends a JSON object to the client containing the user's data.
     *
     * @async
     * @param {*} req The user's username and token
     * @param {*} res An object containing the user's data.
     */
    getUser: async (req, res) => {
        await Users.findOne({ Username: req.params.Username })
            .then((user) => {
                // if (!user) {
                //     return res.status(404).send(req.params.Username + " was not found.");
                // }
                res.json(user);
            })
            .catch((error) => {
                console.error(erorr);
                res.status(500).send("Error: " + error);
            });
    },

    /**
     * Sends a JSON object to the client with a list of IDs corresponding to the user's favorites.
     *
     * @async
     * @param {*} req The user's username and token
     * @param {*} res A list of movie IDs corresponding to the user's favorites.
     */
    getUserFavorites: async (req, res) => {
        await Users.findOne({ Username: req.params.Username })
            .then((user) => {
                const favorites = user.Favorites;
                res.json(favorites);
            })
            .catch((error) => {
                console.error(erorr);
                res.status(500).send("Error: " + error);
            });
    },

    /**
     * Sends the user their updated information when the user requests changes to their account information.
     *
     * @async
     * @param {*} req A JSON object containing the user's new account information, including a new username, password (optional), email and birthday.
     * @param {*} res A JSON object containing the updated user information
     * @returns a status message saying permission denied if the request did not come from the same username that the user is trying to change if that is the case.
     */
    updateUser: async (req, res) => {
        if (req.user.Username !== req.params.Username) {
            return res.status(400).send("Permission Denied");
        }
        await Users.findOneAndUpdate(
            { Username: req.params.Username },
            {
                $set: {
                    Username: req.body.Username,
                    Password: req.body.Password ? Users.hashPassword(req.body.Password) : req.body.Password,
                    Email: req.body.Email,
                    Birthday: req.body.Birthday,
                },
            },
            { new: true }
        )
            .then((updatedUser) => {
                res.json(updatedUser);
                console.log("Username: " + req.params.Username + " updated to: " + req.body.Username);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    },

    /**
     * Sends a JSON object with the updated user data, including the new movie ID which has been added to their favorites list.
     *
     * @async
     * @param {*} req contains the user's username and token, as well as a MovieID which should be added to the user's favorites
     * @param {*} res A JSON object with the user's updated data, including their updated favorites list.
     * @returns "Permission Denied" if the request did not come from the same user whose favorites list you are trying to update.
     */
    addFavorite: async (req, res) => {
        if (req.user.Username !== req.params.Username) {
            return res.status(400).send("Permission Denied");
        }
        await Users.findOneAndUpdate(
            { Username: req.params.Username },
            { $push: { Favorites: req.body.MovieID } },
            { new: true }
        )
            .then((updatedUser) => {
                res.json(updatedUser);
                console.log("Adding " + req.body.MovieID + " to " + req.params.Username + "'s favorites list.");
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    },

    /** Sends a JSON object with the updated user data, including the new movie ID which has been removed from their favorites list.
     *
     * @async
     * @param {*} req contains the user's username and token, as well as a MovieID which should be removed from the user's favorites
     * @param {*} res A JSON object with the user's updated data, including their updated favorites list.
     * @returns "Permission Denied" if the request did not come from the same user whose favorites list you are trying to update.
     */
    deleteFavorite: async (req, res) => {
        if (req.user.Username !== req.params.Username) {
            return res.status(400).send("Permission Denied");
        }
        console.log("Removing " + req.body.MovieID + " from " + req.params.Username + "'s favorites list.");
        await Users.findOneAndUpdate(
            { Username: req.params.Username },
            { $pull: { Favorites: req.body.MovieID } },
            { new: true }
        )
            .then((updatedUser) => {
                res.json(updatedUser);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    },

    /**
     * Sends a message confirming the user account has been deleted when the username and token recieved match the account that you are trying to delete.
     *
     * @async
     * @param {*} req Contains the user's username and token.
     * @param {*} res A message confirming the users account has been deleted to be sent back to the user.
     * @returns "Permission Denied" if the request did not come from the same user whose account you are trying to delete.
     */
    deleteUser: async (req, res) => {
        if (req.user.Username !== req.params.Username) {
            return res.status(400).send("Permission Denied");
        }
        console.log("Deleting user: " + req.params.Username);
        await Users.findOneAndDelete({ Username: req.params.Username })
            .then((user) => {
                if (!user) {
                    res.status(400).send(req.params.Username + " was not found.");
                } else {
                    res.status(200).send(req.params.Username + " was deleted");
                }
            })
            .catch((err) => {
                console.error(err);
                res.status(500).send("Error: " + err);
            });
    },
};
