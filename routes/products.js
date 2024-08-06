const express = require("express");
const productsController = require("../controllers/products");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.get("/getProdcutDetails/:productId", productsController.getProdcutDetails);
router.post("/createProduct", productsController.createProduct);

module.exports = router;