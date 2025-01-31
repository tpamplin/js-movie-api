const Models = require("../public/models.js");

const { check, validationResult } = require("express-validator");

const Users = Models.User;

module.exports = {
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
