import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await API.get(
                    "/orders/my-orders"
                );

                setOrders(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch orders:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load orders."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <Navbar />

            <main className="orders-container">

                <h1>📦 My Orders</h1>

                {loading ? (
                    <Loading />
                ) : error ? (
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="empty-orders">
                        <h2>
                            You have not placed any
                            orders yet.
                        </h2>

                        <Link to="/">
                            <button>
                                Browse Books
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="orders-list">

                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="order-card"
                            >

                                <div className="order-header">

                                    <div>
                                        <h3>
                                            Order
                                            #{order._id.slice(
                                                -8
                                            )}
                                        </h3>

                                        <p>
                                            Order ID:{" "}
                                            {order._id}
                                        </p>
                                    </div>

                                    <span
                                        className={`order-status ${order.status
                                            .toLowerCase()
                                            .replace(
                                                " ",
                                                "-"
                                            )}`}
                                    >
                                        {order.status}
                                    </span>

                                </div>

                                <div className="order-info">

                                    <p>
                                        <strong>
                                            Payment:
                                        </strong>{" "}
                                        {
                                            order.paymentStatus
                                        }
                                    </p>

                                    <p>
                                        <strong>
                                            Total:
                                        </strong>{" "}
                                        ₹
                                        {
                                            order.totalPrice
                                        }
                                    </p>

                                </div>

                                <Link
                                    to={`/orders/${order._id}`}
                                >
                                    <button>
                                        View Order
                                    </button>
                                </Link>

                            </div>
                        ))}

                    </div>
                )}

            </main>
        </div>
    );
};

export default MyOrders;