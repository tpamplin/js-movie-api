const passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Models = require("models.js"),
    passpoerJWT = require("passport-jwt");

let Users = Models.User,
    JWTStrategy = passportJWT.Strategy,
    ExtractJWT = passportJWT.ExtractJwt;

passport.use(
    new LocalStrategy(
        {
            usernameField: "Username",
            passwordField: "Password",
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            await Users.findOne({ Username: username })
                .then((user) => {
                    if (!user) {
                        console.log("Incorrect username");
                        return callback(null, false, { message: "Incorrect username or password" });
                    }
                    console.log("finished");
                    return callback(null, user);
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        return callback(error);
                    }
                });
        }
    )
);

passport.use(
    new JWTstrategy(
        { jwtFromRequest: ExtractJWT.fromAuthHeaderAsBererToken(), secretOrKey: "Your_JWT_Secret" },
        async (jwtPayload, callback) => {
            return await Users.findById(jwtPayload._id)
                .then((user) => {
                    return callback(null, user);
                })
                .catch((error) => {
                    return callback(error);
                });
        }
    )
);
