const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    contact: {
        type: Number,
        required: true,
        unique: true
    },
    country: {
        type: String,
        required: true,
    },
    billing: {
        type: Boolean,
        default: false
    },
    verified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;