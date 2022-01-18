import passport from "passport";
import { AccountModel } from "../models";
import { accountServices } from "../services/account.Service";
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
passport.serializeUser((user: any, done: any) => {
    return done(null, user._id);
});

passport.deserializeUser(async (email: string, done: any) => {

    const doc = await accountServices.getAccount(
        {
            Email: email,
        },
        { Password: 0, __v: 0 }
    );
    return done(null, doc);
})
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.ACCESS_TOKEN_SECRET
}, function (jwt_payload: any, done: any) {
    AccountModel.findOne({ _id: jwt_payload._id }, function (err: any, user: any) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    });
}));

passport.use(new GoogleStrategy({
    clientID: `${process.env.GOOGLE_CLIENT_ID}`,
    clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    callbackURL: "/auth/google/callback"
},
    function (_: any, __: any, email: any, profile: any, cb: any) {

        AccountModel.findOne({ googleId: profile.id }, async (err: Error, doc: any) => {

            if (err) {
                return cb(err, null);
            }

            if (!doc) {
                const account = {
                    Email: email,
                    Name: profile.displayName,
                    Image: profile.photos.value,
                    Password: "",
                    Phone: "",
                    MSSV: "",
                    Year: "",
                    Introduce: "",
                    Birth: "",
                    Gender: "",
                    Permission: "User",
                    CodeClass: "",
                    Status: false,
                };
                const { data, message, status } = await accountServices.register(
                    account,
                    email
                );
                cb(null, account);
            }
            cb(null, doc);
        })

    }));

export default passport;