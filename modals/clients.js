const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    apiKey:{
        type: String,
        unique: true,
        required: true
    },
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
    },
    users: [
        {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    config: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Config'
    }
}, {
    timestamps: true
});

const Client = mongoose.model('Client', clientSchema);
module.exports = Client;

