import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const OrderDetails = () => {
    const { id } = useParams();

    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await API.get(
                    `/orders/${id}`
                );

                setOrder(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch order:",
                    error
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load order."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return (
            <div>
                <Navbar />

                <main className="order-details-container">
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                </main>
            </div>
        );
    }

    if (!order) {
        return (
            <div>
                <Navbar />

                <main className="order-details-container">
                    <p>Order not found.</p>
                </main>
            </div>
        );
    }

    return (
        <div>
            <Navbar />

            <main className="order-details-container">

                <h1>📦 Order Details</h1>

                <div className="order-details-card">

                    <div className="order-details-header">

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

                    <div className="order-status-info">

                        <div>
                            <strong>
                                Order Status
                            </strong>

                            <p>{order.status}</p>
                        </div>

                        <div>
                            <strong>
                                Payment Status
                            </strong>

                            <p>
                                {order.paymentStatus}
                            </p>
                        </div>

                    </div>

                    <h2 className="order-books-title">
                        Books
                    </h2>

                    <div className="ordered-books">

                        {order.books.map((item) => (
                            <div
                                key={item.book._id}
                                className="ordered-book"
                            >

                                <div className="ordered-book-image">
                                    {item.book.image ? (
                                        <img
                                            src={
                                                item.book
                                                    .image
                                            }
                                            alt={
                                                item.book
                                                    .title
                                            }
                                        />
                                    ) : (
                                        <span>
                                            📚
                                        </span>
                                    )}
                                </div>

                                <div className="ordered-book-info">

                                    <h3>
                                        {
                                            item.book
                                                .title
                                        }
                                    </h3>

                                    <p>
                                        Author:{" "}
                                        {
                                            item.book
                                                .author
                                        }
                                    </p>

                                    <p>
                                        Price: ₹
                                        {item.price}
                                    </p>

                                    <p>
                                        Quantity:{" "}
                                        {item.quantity}
                                    </p>

                                    <p>
                                        Subtotal: ₹
                                        {item.price *
                                            item.quantity}
                                    </p>

                                </div>

                            </div>
                        ))}

                    </div>

                    <div className="order-total">
                        <span>
                            Total Amount
                        </span>

                        <strong>
                            ₹{order.totalPrice}
                        </strong>
                    </div>

                </div>

            </main>
        </div>
    );
};

export default OrderDetails;