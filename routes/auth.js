const express = require("express");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

router.post("/signup", authController.signUp);
router.post("/login", authController.login);

module.exports = router;