/**
 * Allows users to authorize themselves with a jwt token
 */

const jwtSecret = "your_jwt_secret";

/**
 * import necessary dependencies for jwt token to work.
 */
const jwt = require("jsonwebtoken"),
    passport = require("passport"),
    models = require("../public/models");

const User = models.User;
require("../passport");

/**
 * Generates a jwt token that is sent with future api requests to authenticate the user.
 * @param {*} user
 * @returns {string} a token the user can use to authenticate themselves.
 */
let generateJWTToken = (user) => {
    return jwt.sign(user, jwtSecret, {
        subject: user.Username,
        expiresIn: "7d",
        algorithm: "HS256",
    });
};

/**
 * This function will check the user's info that they send with their login request and checks to see if it matches a user on the database.
 * If a user is found with a matching username and password, it sends the entire user object back along with a jwt token for authentication in future requests.
 *
 * @param {*} router
 * @param {*} req Recieves username and password
 * @param {*} res The user object and a jwt token
 */
module.exports = (router) => {
    router.post("/login", (req, res) => {
        passport.authenticate("local", { session: false }, (error, user, info) => {
            if (error || !User) {
                return res.status(400).json({
                    message: "Something is not right.",
                    user: user,
                });
            }
            req.login(user, { session: false }, (error) => {
                if (error) {
                    res.send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
};
