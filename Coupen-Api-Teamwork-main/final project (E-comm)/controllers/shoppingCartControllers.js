const { CartData } = require("../models/carts")

const AddToCart = async (req, res) => {
  try {
    const { productName, username } = req.body;

    if (!productName || !username)
      return res.status(400).send("all fields are required");

    let cart = await CartData.findOne({ username });

    if (!cart) {
      const newCart = new CartData({
        username,
        products: [productName]
      });
      await newCart.save();
      return res.status(201).json({ message: "cart created and product added", newCart });
    }

    if (cart.products.includes(productName)) {
      return res.status(200).json({ message: "product already in cart" });
    }

    cart.products.push(productName);
    await cart.save();

    return res.status(200).json({ message: "product added to cart", cart });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const DeleteFromCart = async (req, res) => {
  try {
    const { productName, username } = req.body;

    if (!productName || !username)
      return res.status(400).send("all fields are required");

    let cart = await CartData.findOne({ username });
    if (!cart) return res.status(404).send("cart not found");

    if (!cart.products.includes(productName))
      return res.status(404).send("product not found in cart");

    cart.products = cart.products.filter(p => p !== productName);
    await cart.save();

    return res.status(200).json({ message: "product removed from cart", cart });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

module.exports={AddToCart,DeleteFromCart}
