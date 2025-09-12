const mongoose = require('mongoose');


const reviewsSchema = new mongoose.Schema({
    ownerUsername:{type:String, required:true},
    orderId:{type:String, required:true},
    stars:{type:String, required:true},
    description:{type:String, default:null}
})

const reviews = mongoose.model('reviews', reviewsSchema);
module.exports = { reviews }