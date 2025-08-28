const mongoose=require('mongoose');
const productsSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
})

const productsModel=mongoose.model('products',productsSchema);
module.exports={productsModel}