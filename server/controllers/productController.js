const Product = require("../models/Product");

exports.createProduct = async (req, res) => {

    try {

        const product = await Product.create({

            ...req.body,

            seller: req.user.id

        });

        res.status(201).json(product);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};

exports.getProducts = async (req, res) => {

    try {

        const products = await Product.find()

            .populate("seller", "name email")

            .sort({ createdAt: -1 });

        res.json(products);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.getProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id)
            .populate("seller", "name email");

        if (!product) {

            return res.status(404).json({

                message: "Product not found"

            });

        }

        res.json(product);

    }

    catch (err) {

        res.status(500).json({

            message: err.message

        });

    }

};
exports.deleteProduct = async (req, res) => {

    try {

        const product = await Product.findById(req.params.id);

        if (!product) {

            return res.status(404).json({
                message: "Product not found"
            });

        }

        if (product.seller.toString() !== req.user.id) {

            return res.status(403).json({
                message: "Not authorized"
            });

        }

        await product.deleteOne();

        res.json({
            message: "Product deleted successfully"
        });

    }

    catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

};