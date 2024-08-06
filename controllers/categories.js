const Category = require("../models/category");
const { v4: uuidv4 } = require("uuid");

exports.createCategory = async (req, res, next) => {
    const { name } = req.body;

    try {
        const existingCateogry = await Category.findOne({ name: name })

        if (!existingCateogry) {
            const newCategory = new Category({ id: uuidv4(), name })
            const category = await newCategory.save();
            return res.status(201).json({
                message: "success",
                category
            })
        }
        else {
            const error = new Error("category already exists.")
            throw error;
        }

    } catch (error) {
        error.statusCode = 500;
        next(error)
    }
};


exports.getCategories = async (req, res, next) => {

    try {
        const categories = await Category.find({})
        return res.status(201).json({
            message: "success",
            categories
        })
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}
