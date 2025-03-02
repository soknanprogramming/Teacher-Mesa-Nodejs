const Product = require('../models/product');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'imageupload/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createProduct = [
    upload.single('img'),
    async (req, res) => {
        try {
            const newProduct = await Product.create({
                ...req.body,
                img: req.file ? req.file.filename : null
            });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.updateProduct = [
    upload.single('img'),
    async (req, res) => {
        try {
            const { ProductID, ...updateData } = req.body;
            if (req.file) {
                updateData.img = req.file.filename;
            }
            const [updated] = await Product.update(updateData, {
                where: { ProductID: ProductID }
            });
            if (updated) {
                const updatedProduct = await Product.findByPk(ProductID);
                res.json(updatedProduct);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
];

exports.deleteProduct = async (req, res) => {
    try {
        const { ProductID } = req.body;
        const deleted = await Product.destroy({
            where: { ProductID: ProductID }
        });
        if (deleted) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
