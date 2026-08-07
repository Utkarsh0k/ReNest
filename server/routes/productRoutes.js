const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {

    createProduct,

    getProducts,

    getProduct

} = require("../controllers/productController");
router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/", protect, createProduct);

module.exports = router;