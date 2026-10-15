const Order = require("../models/Order");
const Book = require("../models/Book");

// Create an order
const createOrder = async (req, res) => {
    try {
        const { books } = req.body;

        if (!books || books.length === 0) {
            return res.status(400).json({
                message: "No books provided"
            });
        }

        let totalPrice = 0;
        const orderBooks = [];

        for (const item of books) {
            const book = await Book.findById(item.book);

            if (!book) {
                return res.status(404).json({
                    message: "Book not found"
                });
            }

            if (book.stock < item.quantity) {
                return res.status(400).json({
                    message: `Not enough stock for ${book.title}`
                });
            }

            totalPrice += book.price * item.quantity;

            orderBooks.push({
                book: book._id,
                quantity: item.quantity,
                price: book.price
            });
        }

        // Reduce stock
        for (const item of books) {
            await Book.findByIdAndUpdate(
                item.book,
                {
                    $inc: {
                        stock: -item.quantity
                    }
                }
            );
        }

        const order = await Order.create({
            user: req.user.id,
            books: orderBooks,
            totalPrice
        });

        res.status(201).json({
            message: "Order created successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to create order",
            error: error.message
        });
    }
};


// Get logged-in user's orders
const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.id
        }).populate("books.book", "title author price");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get orders",
            error: error.message
        });
    }
};


// Get single order
const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate("user", "name email")
            .populate("books.book", "title author price");

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        // User can only see their own order
        if (
            order.user._id.toString() !== req.user.id &&
            req.user.role !== "admin"
        ) {
            return res.status(403).json({
                message: "Access denied"
            });
        }

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get order",
            error: error.message
        });
    }
};


// Get all orders - Admin
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("books.book", "title author price");

        res.status(200).json(orders);

    } catch (error) {
        res.status(500).json({
            message: "Failed to get orders",
            error: error.message
        });
    }
};


// Update order status - Admin
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            });
        }

        order.status = status;
        await order.save();

        res.status(200).json({
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update order status",
            error: error.message
        });
    }
};


module.exports = {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
};