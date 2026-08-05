const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createProduct,

    getProducts

} = require("../controllers/productController");

router.get("/", getProducts);

router.post("/", protect, createProduct);

module.exports = router;