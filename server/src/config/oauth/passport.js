require('dotenv').config();
const passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_REDIRECT_URI,
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    )
);
passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET,
            callbackURL: 'http://localhost:3000/auth/facebook/callback',
        },
        function (accessToken, refreshToken, profile, cb) {
            return cb(null, profile);
        }
    )
);
passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: 'http://localhost:8080/api/v1/auth/github/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOrCreate({ githubId: profile.id }, function (err, user) {
                return done(err, user);
            });
        }
    )
);
