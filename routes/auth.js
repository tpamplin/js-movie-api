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
 * POST login
 *
 * Authenticates the user using the local Passport strategy. If authentication is successful,
 * a JWT token is generated and returned in the response. If authentication fails, an error message
 * is sent back.
 *
 * @function
 * @name POST /login authenticate
 * @param {Object} req - The Express request object. It contains the `Username` and `Password` fields
 *                       submitted by the client in the body.
 * @param {Object} res - The Express response object. It is used to send the response back to the client.
 *
 * @returns {void} Sends a JSON response containing either the user object and JWT token or an error message.
 *
 * @throws Sends 500 status response if there is an error.
 *
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
                    res.status(500).send(error);
                }
                let token = generateJWTToken(user.toJSON());
                return res.json({ user, token });
            });
        })(req, res);
    });
};
