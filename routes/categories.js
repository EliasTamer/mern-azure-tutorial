const express = require("express");
const categoriesController = require("../controllers/categories");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/createCategory", categoriesController.createCategory);
router.get("/getCategories", categoriesController.getCategories);

module.exports = router;