const Models = require("./models.js");

const Users = Models.User;

module.exports = {
    getUser: async (req, res) => {
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

    updateUsername: (req, res) => {
        res.send("Successful PUT request, updating a username.");
    },

    addFavorite: (req, res) => {
        res.send("Successful POST request, adding a movie to a user's favorites list.");
    },

    deleteFavorite: (req, res) => {
        res.send("Successful DELETE request, removing a movie from user's favorites list.");
    },

    deleteUser: (req, res) => {
        res.send("Sucessful DELETE request, removing a user from the list of users.");
    },
};
