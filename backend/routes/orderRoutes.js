const express = require("express");

const {
    createOrder,
    getMyOrders,
    getOrderById,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/orderController");

const protect = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

const router = express.Router();

// Customer: Create order
router.post("/", protect, createOrder);

// Customer: Get own orders
router.get("/my-orders", protect, getMyOrders);

// Customer/Admin: Get one order
router.get("/:id", protect, getOrderById);

// Admin: Get all orders
router.get("/", protect, admin, getAllOrders);

// Admin: Update order status
router.put("/:id/status", protect, admin, updateOrderStatus);

module.exports = router;