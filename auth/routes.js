const express = require('express');
const passport = require('passport');

const router = express.Router();

// Start the Google OAuth login process
router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Handle Google callback after login
router.get(
    '/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/',
        successRedirect: '/', // you can customize this later
    })
);

// Logout route
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.redirect('/');
    });
});

module.exports = router;
