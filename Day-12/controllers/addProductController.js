const {productsData} = require('../models/products');


const addProduct = async(req,res) => {
    try{
    let {title, description, price, quantity}=req.body;
    let foundProduct=await productsData.findOne({title, description, price});
    if(foundProduct){
        if(!quantity)
            await productsData.updateOne({id:foundProduct.id}, {$inc:{quantity:1}});
        else
            await productsData.updateOne({id:foundProduct.id}, {$inc:{quantity:quantity}});
    }
    else{
    let products=await productsData.find();
    let productsIds=products.map((prod)=>prod.id);
    let newProdId=Math.max(...productsIds,0)+1;
    let newProduct=new productsData({id:newProdId, title, description, price, quantity});
    await newProduct.save();
    }
    res.json({message:"product added successfully ",products:await productsData.find()});
}
catch(err){
    console.log(err);
}
}

module.exports = {addProduct}