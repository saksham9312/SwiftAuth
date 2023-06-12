const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    lastLogin:{
        type: Date
    },
    clientID: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Client'
    },
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
module.exports = User;
