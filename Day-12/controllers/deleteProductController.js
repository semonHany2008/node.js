const {productsData} = require('../models/products');


const deleteProduct = async(req,res) => {
    try{
        const {id}=req.params;
        let foundProduct=await productsData.findOne({id:id});
        if(!foundProduct)
            return res.json({message:`product with this id ${id} not found!`});
        await productsData.deleteOne({id:id});
        res.json({message:`product deleted successfully!`,products:await productsData.find()});
    }
catch(err){
    console.log(err);
}
}

module.exports = {deleteProduct}