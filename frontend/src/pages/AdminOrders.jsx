import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {
        try {
            setLoading(true);

            const response = await API.get("/orders");

            setOrders(response.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    const updateStatus = async (orderId, newStatus) => {
        try {
            await API.put(`/orders/${orderId}/status`, {
                status: newStatus
            });

            alert("Order status updated successfully!");

            fetchOrders();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to update order status"
            );
        }
    };

    return (
        <div>
            <Navbar />

            <main className="admin-orders-container">

                <div className="admin-page-header">
                    <div>
                        <h1>📦 Manage Orders</h1>
                        <p>
                            View customer orders and update their status.
                        </p>
                    </div>
                </div>

                {loading ? (
                    <Loading />
                ) : orders.length === 0 ? (
                    <div className="empty-admin-state">
                        <h2>No orders found.</h2>
                        <p>
                            Customer orders will appear here after
                            they place an order.
                        </p>
                    </div>
                ) : (
                    <div className="admin-orders-list">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="admin-order-card"
                            >

                                <div className="admin-order-header">

                                    <div>
                                        <h2>
                                            Order #
                                            {order._id.slice(-8)}
                                        </h2>

                                        <p>
                                            Order ID: {order._id}
                                        </p>
                                    </div>

                                    <span
                                        className={`order-status ${order.status
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                    >
                                        {order.status}
                                    </span>

                                </div>

                                <div className="admin-order-customer">

                                    <h3>👤 Customer Information</h3>

                                    <p>
                                        <strong>Name:</strong>{" "}
                                        {order.user?.name || "N/A"}
                                    </p>

                                    <p>
                                        <strong>Email:</strong>{" "}
                                        {order.user?.email || "N/A"}
                                    </p>

                                </div>

                                <div className="admin-order-books">

                                    <h3>📚 Ordered Books</h3>

                                    {order.books?.map((item) => (
                                        <div
                                            key={item._id}
                                            className="admin-ordered-book"
                                        >
                                            <div>
                                                <strong>
                                                    {item.book?.title ||
                                                        "Book"}
                                                </strong>

                                                <p>
                                                    Quantity:{" "}
                                                    {item.quantity}
                                                </p>
                                            </div>

                                            <span>
                                                ₹
                                                {item.price *
                                                    item.quantity}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                                <div className="admin-order-footer">

                                    <div className="admin-order-total">

                                        <p>
                                            <strong>
                                                Payment:
                                            </strong>{" "}
                                            {order.paymentStatus}
                                        </p>

                                        <p>
                                            <strong>
                                                Total:
                                            </strong>{" "}
                                            ₹{order.totalPrice}
                                        </p>

                                    </div>

                                    <div className="admin-status-control">

                                        <label>
                                            Change Status
                                        </label>

                                        <select
                                            value={order.status}
                                            onChange={(e) =>
                                                updateStatus(
                                                    order._id,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="Pending">
                                                Pending
                                            </option>

                                            <option value="Processing">
                                                Processing
                                            </option>

                                            <option value="Shipped">
                                                Shipped
                                            </option>

                                            <option value="Delivered">
                                                Delivered
                                            </option>

                                            <option value="Cancelled">
                                                Cancelled
                                            </option>
                                        </select>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>
                )}

            </main>
        </div>
    );
};

export default AdminOrders;