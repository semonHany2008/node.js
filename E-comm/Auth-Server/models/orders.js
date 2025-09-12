const mongoose = require('mongoose');

const orders = new mongoose.Schema({
    prductName: {
        type: String,
        required: true,
    },
    ownerUsername: {
        type: String,
        required: true,
    },
    delivered : {
        type : Boolean,
        default : false
    }
}, {
    timestamps: true
});

const ordersData = mongoose.model('orders', orders);
module.exports = { ordersData }