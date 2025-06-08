const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      // You can connect this to a DB later to save or find users
      // For now, just return the profile
        return done(null, profile);
    }
    )
);

// Save user to session
passport.serializeUser((user, done) => {
    done(null, user);
});

// Restore user from session
passport.deserializeUser((user, done) => {
    done(null, user);
});
