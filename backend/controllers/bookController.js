const Book = require("../models/Book");

// Get all books
const getBooks = async (req, res) => {
    try {
        const { search, page = 1, limit = 5 } = req.query;

        const query = {};

        // Search by title or author
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } }
            ];
        }

        const skip = (page - 1) * limit;

        const books = await Book.find(query)
            .skip(skip)
            .limit(Number(limit));

        const totalBooks = await Book.countDocuments(query);

        res.status(200).json({
            books,
            currentPage: Number(page),
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to get books",
            error: error.message
        });
    }
};


// Get single book
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get book",
            error: error.message
        });
    }
};


// Add new book
const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);

        res.status(201).json({
            message: "Book created successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to create book",
            error: error.message
        });
    }
};


// Update book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book updated successfully",
            book
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to update book",
            error: error.message
        });
    }
};


// Delete book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete book",
            error: error.message
        });
    }
};


module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};