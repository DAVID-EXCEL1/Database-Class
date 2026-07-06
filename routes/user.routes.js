const express = require("express")
const router = express.Router()
const { getSignin, getSignup, getDashboard, postLogin, postRegister } = require("../controllers/user.controllers");

router.use(express.urlencoded({ extended: true }));

router.get('/signup', getSignup);

router.get('/signin', getSignin);

router.get('/dashboard', getDashboard);

// Handle user registration
router.post("/register", postRegister);

router.post("/login", postLogin);

module.exports = router;