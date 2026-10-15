const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },

        price: {
            type: Number,
            required: true
        },

        genre: {
            type: String,
            required: true,
            trim: true
        },

        stock: {
            type: Number,
            required: true,
            default: 0
        },

        ISBN: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        description: {
            type: String,
            trim: true
        },

        image: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Book", bookSchema);