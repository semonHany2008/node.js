const {CartData} = require("../models/carts");
const {ProductData} = require("../models/products");

const buy_without_discount = async (req, res) => {
	let { username } = req.body;
	if (!username) {
		return res.json({ message: "username is required" });
	}
	let foundCart = await CartData.findOne({ username });
	if (!foundCart) {
		return res.json({ message: "you have no products in your cart to buy" });
	}
	let products = foundCart.products;
	let totalPrice=0;
	for (let prod of products) {
		let product = await ProductData.findOne({ productName: prod });
		totalPrice += product.price;
	}
	res.json({ products, totalPrice: totalPrice + "$" });
};

const buy_with_discount = async (req, res) => {
	let { discount_coupon, username } = req.body;
	if (!discount_coupon || !username) {
		return res.json({ message: "all fields are required" });
	}
	// Discound Fetch
	const fetchPOSTREQUEST = async (url, body) => {
		try {
			console.log("FETCHING URL:", url, "BODY:", body); // Debug log
			const response = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
		}
	};
	fetchPOSTREQUEST("https://127.0.0.1:8000/discount", {
		code: discount_coupon,
	});
	let foundCart = await CartData.findOne({ username });
	if (!foundCart) {
		return res.json({ message: "you have no products in your cart to buy" });
	}
	let products = foundCart.products;
	let TPrice_before=0;
	for (let prod of products) {
		let product = await ProductData.findOne({ productName: prod });
		TPrice_before += product.price;
	}
	res.json({
		products,
		Total_before_discount: TPrice_before + "$",
		Total_after_discount: TPrice_before - TPrice_before * 0.2,
	});
};

module.exports = { buy_without_discount, buy_with_discount };
