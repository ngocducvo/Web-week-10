const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userM = require('../models/user.M');
const bcrypt = require('bcrypt');

module.exports = app => {
    passport.use(new LocalStrategy (
        async (username, passwork, done) => {
            let user;
            try {
                user = await userM.get(username);
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.'});
                }
                const challengeResult = await bcrypt.compare(passwork, user.f_Password);
                if (!challengeResult) {
                    return done(null, false, { message: 'Incorrect password.'});
                }
                return done(null, user);
            } catch (error) {
                return done(error);
            }
        }
    ));
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(async (user, done) => {
        try {
            const u = await userM.get(user.f_Username);
            done(null, u);
        } catch (error) {
            done(new Error('error'), null);
        }
    });

    app.use(passport.initialize());
    app.use(passport.session());
}