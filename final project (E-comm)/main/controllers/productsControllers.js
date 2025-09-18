const { ProductData } = require("../models/products");

const GetAllProducts = async (req, res) => {
  try {
    let products = await ProductData.find();
    if (products.length === 0) return res.status(200).send("there are no products here");
    return res.status(200).json(products);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const GetProduct = async (req, res) => {
  try {
    let { product } = req.params;
    if (!product) return res.status(400).send("product name is required");
    let productData = await ProductData.findOne({ productName: product });
    if (!productData) return res.status(400).send("there is no product with this name");
    return res.status(200).json(productData);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const AddProduct = async (req, res) => {
  try {
    let { productName, title, description, price } = req.body;
    if (!productName || !title || !description || !price)
      return res.status(400).send("all fields are required");

    let productData = await ProductData.findOne({ productName });
    if (productData) return res.status(400).send("the product already exists");

    let newproduct = new ProductData({
      productName,
      title,
      description,
      price
    });
    await newproduct.save();
    return res.status(200).json({ message: "product added successfully", newproduct });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err.message);
  }
};

const DeleteProduct = async (req, res) => {
  const { productName } = req.body;
  try {
    const deleted = await ProductData.findOneAndDelete(productName);
    if (!deleted) return res.status(404).send("product not found");
    return res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const EditProduct = async (req, res) => {
  try {
    const { productName: oldname } = req.body;

    const { productName, title, description, price } = req.query;

    if (!oldname)
      return res.status(400).send("current product name is required");

    let updateFields = {};
    if (productName) updateFields.productName = productName;
    if (title) updateFields.title = title;
    if (description) updateFields.description = description;
    if (price) updateFields.price = price;

    if (Object.keys(updateFields).length === 0)
      return res.status(400).send("no new data provided to update");

    const updated = await ProductData.findOneAndUpdate(
      { productName: oldname }, 
      updateFields,
      { new: true }
    );

    if (!updated) return res.status(404).send("product not found");

    return res.status(200).json({
      message: "product updated successfully",
      updated
    });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};


module.exports = {
  GetAllProducts,
  GetProduct,
  AddProduct,
  EditProduct,
  DeleteProduct
};
