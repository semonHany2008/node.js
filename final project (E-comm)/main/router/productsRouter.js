const {
	GetAllProducts,
	GetProduct,
	AddProduct,
	EditProduct,
	DeleteProduct,
} = require("../controllers/productsControllers");
const checkAuth = require("../middleware/checkAuth");

const router = require("express").Router();

router.get("/all-products", GetAllProducts);
router.get("/:product", GetProduct);


router.post("/add-product", checkAuth, AddProduct);
router.put("/change-data", checkAuth, EditProduct);
router.delete("/delete-product", checkAuth, DeleteProduct);

module.exports = router;
