const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    imagePath: {
        type: String,
    },
    categoryId: {
        type: 'ObjectId',
        ref: 'Category'
    }
});

module.exports = mongoose.model("Product", productSchema);
