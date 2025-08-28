const {productsData} = require('../models/products');


const editProduct = async(req,res) => {
    try{
        const {id}=req.params;
        let {title, description, price, quantity}=req.body;
        let foundProduct=await productsData.findOne({id:id});
        if(!foundProduct)
            return res.json({message:`product with id ${id} not found!`});
        await productsData.updateOne({id:id}, {title, description, price, quantity});
        res.json({message:`product updated successfully!`,products:await productsData.find()});
    }
catch(err){
    console.log(err);
}
}

module.exports = {editProduct}