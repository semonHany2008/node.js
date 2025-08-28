const {productsData} = require('../models/products');


const getProduct = async(req,res) => {
    const {id}=req.params;
    let product=await productsData.findOne({id:id});
    if(!product)
        res.json({message:"product not found!"})
    res.json(product);
}

module.exports = {getProduct}