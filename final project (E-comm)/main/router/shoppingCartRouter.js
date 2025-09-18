const { AddToCart, DeleteFromCart } = require("../controllers/shoppingCartControllers");
const checkAuth = require("../middleware/checkAuth");

const router = require("express").Router();


router.post("/add", checkAuth, AddToCart);
router.delete("/delete", checkAuth, DeleteFromCart);

module.exports = router;
