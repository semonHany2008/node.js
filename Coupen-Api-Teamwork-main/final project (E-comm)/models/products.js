const mongoose=require('mongoose')

const ProductsSchema= new mongoose.Schema({
    productName:{
        type:String,
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
        type:String,
        required:true
    },
    
})
const ProductData=mongoose.model('Product',ProductsSchema)
module.exports={ProductData}
