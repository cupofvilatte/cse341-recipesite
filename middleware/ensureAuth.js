function ensureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.status(401).json({ error: 'Unauthorized: Please log in.' });
    }
}

module.exports = { ensureAuth };
