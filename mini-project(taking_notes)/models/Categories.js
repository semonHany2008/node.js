const mongoose=require('mongoose');

const categoriesSchema=new mongoose.Schema({
    name: {type:String, required:true},
  ownerUsername: {type:String, required:true},
  createdAt:{type:Date, default: Date.now, expires:'3d'}
});
categoriesSchema.index({name:1, ownerUsername:1},{unique:true}); //composite unique key
const categoriesModel=mongoose.model('categories',categoriesSchema);
module.exports={categoriesModel}