const {productsData} = require('../models/products');


const getProducts = async(req,res) => {
    let products=await productsData.find();
    if(!products.length)
        res.json({message:"there's no products yet!"})
    res.json({products});
}

module.exports = {getProducts}