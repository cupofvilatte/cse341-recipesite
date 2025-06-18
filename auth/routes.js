const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start the Google OAuth login process
router.get(
    '/google',
    passport.authenticate('google', {
        scope: ['profile', 'email'],
        prompt: 'select_account',
    })
);

// Handle Google callback after login
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/',
    })
);

// Logout route
router.get('/logout', (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.session.destroy(() => {
            res.redirect('/');
        });
    });
});

module.exports = router;
