const Models = require("../public/models.js");

const Users = Models.User;

module.exports = {
    addUser: async (req, res) => {
        await Users.findOne({ Usernmame: req.body.Username })
            .then((user) => {
                if (user) {
                    return res.status(400).send(req.body.Username + " already exists.");
                } else {
                    Users.create({
                        Username: req.body.Username,
                        Password: req.body.Password,
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

    updateUsername: async (req, res) => {
        await Users.findOneAndUpdate(
            { Username: req.params.Username },
            { $set: { Username: req.body.Username } },
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
