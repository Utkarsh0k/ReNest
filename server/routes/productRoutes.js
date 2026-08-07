const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    markSold
} = require("../controllers/productController");

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", protect, createProduct);

router.delete("/:id", protect, deleteProduct);

router.put("/:id/sold", protect, markSold);

module.exports = router;