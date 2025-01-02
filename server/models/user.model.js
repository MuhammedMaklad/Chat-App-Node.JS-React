
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Please provide name"],
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: 'Invalid email format'
        }
    },
    password: {
        type: String,
        required: [true, "Please provide password"],
        minlength: 8,
        select: false
    },
    profilePicture: {
        type: String,
        default: ""
    }
}, {
    timestamps: true
})

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;