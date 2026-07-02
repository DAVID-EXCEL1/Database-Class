const express = require("express")
const router = express.Router()
const User = require("../models/user.models");

router.use(express.urlencoded({ extended: true }));

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.get('/signin', (req, res) => {
    res.render('signin');
});

router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});

// Handle user registration
router.post("/register", (req, res) => {
    // Extract user data from the request body
    const { fullName, email, phone, password } = req.body;
    // Create a new user instance and save it to the database
    const user = new User({ fullName, email, phone, password });
    // Save the user to the database
    user.save()
        .then(() => {
            res.redirect('/signin');
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            res.status(500).send('Error saving user');
        });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    // Find the user by email and password in the database
    User.findOne({ email, password })
        .then((user) => {
            if (user) {
                res.redirect('/dashboard');
            } else {
                res.status(401).send('Invalid email or password');
            }
        })
        .catch((err) => {
            console.error('Error finding user:', err);
            res.status(500).send('Error finding user');
        });
});

module.exports = router;