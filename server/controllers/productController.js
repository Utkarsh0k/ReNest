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