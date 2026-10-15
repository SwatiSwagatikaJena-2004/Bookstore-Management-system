const express = require("express");

const {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Get all books
router.get("/", getBooks);

// Get single book
router.get("/:id", getBookById);

// Admin: Add book
router.post("/", protect, admin, createBook);

// Admin: Update book
router.put("/:id", protect, admin, updateBook);

// Admin: Delete book
router.delete("/:id", protect, admin, deleteBook);

module.exports = router;