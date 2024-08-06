const fs = require('fs');
const path = require('path');
const Product = require("../models/product");
const { v4: uuidv4 } = require("uuid");

exports.createProduct = async (req, res, next) => {
    const { name, description, price, base64Img, categoryId } = req.body;
    try {
        const generatedId = uuidv4();
        const imagesDir = path.join(__dirname, '../images');
        const imagePath = path.join(imagesDir, `${name}-${generatedId}.png`);
        let base64Image = base64Img.split(';base64,').pop();

        // write the base64 decoded image to the file
        fs.writeFile(imagePath, base64Image, { encoding: 'base64' }, async () => {

            const newProduct = new Product({ id: generatedId, name, description, price, imagePath: `/images/${name}-${generatedId}.png`, categoryId });

            const product = await newProduct.save();
            return res.status(201).json({
                message: "success",
                product,
            })
        });

    } catch (error) {
        error.statusCode = 500;
        next(error)
    }
};

exports.getProdcutDetails = async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await Product.findOne({ id: productId });

        const relatedProducts = await Product.find({ categoryId: product.categoryId, id: { $ne: product.id } })

        if (!product) {
            const error = new Error("product doesn't exist");
            error.statusCode = 404;
            throw error;
        }

        return res.status(201).json({
            message: "success",
            product,
            relatedProducts
        })
    } catch (error) {
        next(error);
    }
}

