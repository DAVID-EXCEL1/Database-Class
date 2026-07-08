const express = require("express");
const User = require("../models/user.models");
const bcrypt = require("bcrypt");
const saltRound = 10;
const jwt = require("jsonwebtoken");

const getSignin = (req, res) => {
    res.render('signin');
}

const getSignup = (req, res) => {
    res.render('signup');
}

const getDashboard = (req, res) => {
    res.render('dashboard');
}

const postRegister = (req, res) => {
    // Extract user data from the request body

    const { fullName, email, phone, password } = req.body;
    // Hash the password before saving it to the database
    bcrypt.hash(password, saltRound)
        .then((hashedPassword) => {
            // Create a new user instance and save it to the database
            const user = new User({ fullName, email, phone, password: hashedPassword });
            // Save the user to the database
            return user.save();
        })
        .then(() => {
            res.redirect('/signin');
        })
        .catch((err) => {
            console.error('Error saving user:', err);
            res.status(500).send('Error saving user');
        });
}
const postLogin = (req, res) => {
    const { email, password } = req.body;
    // Find the user by email in the database
    User.findOne({ email })
        .then((user) => {
            if (user) {
                // Compare the provided password with the hashed password in the database
                bcrypt.compare(password, user.password)
                    .then((isMatch) => {
                        if (isMatch) {
                            // Generate a JWT token
                            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                            res.cookie('token', token, { httpOnly: true });
                            res.redirect('/dashboard');
                        } else {
                            res.status(401).send('Invalid email or password');
                        }
                    });
            } else {
                res.status(401).send('Invalid email or password');
            }
        })
        .catch((err) => {
            console.error('Error finding user:', err);
            res.status(500).send('Error finding user');
        });
}

module.exports = {
    getSignin,
    getSignup,
    getDashboard,
    postRegister,
    postLogin
}