const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, '{PATH} is Required'],
        trim: true
    },
    password: {
        type: String,
        // required: [true, '{PATH} is Required'],
        trim: true
    },
    confirmPassword: {
        type: String,
        // required: [true, '{PATH} is Required'],
        trim: true
    }
});



const User = mongoose.model('User', userSchema);
module.exports = User; //export the model