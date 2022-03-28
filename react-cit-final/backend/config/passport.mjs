import {ExtractJwt} from "passport-jwt";
import {keys} from "./db.mjs";
import JwtStrategy from "passport-jwt/lib/strategy.js";
import User from "../models/usersModel.mjs";


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

export const getPass = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};