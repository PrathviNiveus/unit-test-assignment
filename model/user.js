
const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        contactNumber: {
            type: Number,
            required: true,
        },
        emailId: {
            type: String,
            required: true,
        },
        location: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const UserSchema = mongoose.model('UserSchema', userSchema);
module.exports = UserSchema;