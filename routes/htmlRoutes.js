const router = require('express').Router();
const { Attire } = require('../models');
const withAuth = require('../utils/auth'); // Import the auth middleware
const { log } = require('handlebars');


router.get('/homepage-attire', withAuth, async (req, res) => {
    try {
        console.log(req.session)
        res.render('homepage-attire', {loggedIn: req.session.loggedIn})

    } catch (err) {
        res.status(500).json(err);
    }
})

// Login route - Public
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/login');
        return;
    }
    res.render('login', { title: 'Login',loggedIn: req.session.loggedIn });
});

module.exports = router;
