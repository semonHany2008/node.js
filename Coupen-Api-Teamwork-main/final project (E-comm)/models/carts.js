const mongoose=require('mongoose')

const CartSchema= new mongoose.Schema({
    products:Array,
    username:{
        type:String,
        required:true
    }
    
})
const CartData=mongoose.model('cartdata',CartSchema)
module.exports={CartData}
