const mongoose = require("mongoose")

// Schema for user registration : This defines the structure of the user data in the database
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Model for user registration : This allows us to interact with the 'users' collection in the database
module.exports = mongoose.model('User', userSchema);