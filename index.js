const express = require('express');
const ejs = require("ejs");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');

dotenv.config();
app.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });

    app.use("/", userRoutes);



app.get('/', (req, res) => {
    res.render('index');
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    // console.log("Server is running on port " + port);
});


// Assignment : 
// Go through the modularization we did today and finish it up by putting the things that belongs to controllers in your controllers folder.
// harsh your password from your signup form, also add a confirm password field to your signup form and check if the password and confirm password match before saving the user to the database. If they don't match, send an error message back to the user. Also, add a logout route that destroys the user's session and redirects them to the login page. then add atoken for your login page and check if the token is valid before allowing the user to access the dashboard page. If the token is invalid, redirect the user to the login page.


// MVCR Architecture - This just has to do with your backend folder structure, in the sense that every thing that pertains to model stays in Models folder, everything that looks like a controller stays in controllers folder as well.
// M - Models
// V - Views 
// C - Controllers
// R - Routes




// ROUTES -






















// pages - HomePage, About, Login,Signup ...
// components - Navbar,Footer,Sidebar...