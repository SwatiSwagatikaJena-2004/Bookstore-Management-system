import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(cart);
    }, []);

    const updateQuantity = (bookId, change) => {
        const updatedCart = cartItems.map((item) => {
            if (item.book._id === bookId) {
                const newQuantity =
                    item.quantity + change;

                return {
                    ...item,
                    quantity: Math.max(1, newQuantity)
                };
            }

            return item;
        });

        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const removeFromCart = (bookId) => {
        const updatedCart = cartItems.filter(
            (item) => item.book._id !== bookId
        );

        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total +
            item.book.price * item.quantity,
        0
    );

    const handleCheckout = async () => {
        try {
            const orderBooks = cartItems.map(
                (item) => ({
                    book: item.book._id,
                    quantity: item.quantity
                })
            );

            await API.post("/orders", {
                books: orderBooks
            });

            alert("Order placed successfully!");

            localStorage.removeItem("cart");
            setCartItems([]);

            navigate("/orders");
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to place order"
            );
        }
    };

    return (
        <div>
            <Navbar />

            <main className="cart-container">

                <h1>🛒 Your Cart</h1>

                {cartItems.length === 0 ? (
                    <div className="empty-cart">
                        <h2>Your cart is empty.</h2>

                        <button
                            onClick={() =>
                                navigate("/")
                            }
                        >
                            Browse Books
                        </button>
                    </div>
                ) : (
                    <div className="cart-layout">

                        <div className="cart-items">

                            {cartItems.map((item) => (
                                <div
                                    key={item.book._id}
                                    className="cart-item"
                                >

                                    <div className="cart-item-image">
                                        {item.book.image ? (
                                            <img
                                                src={
                                                    item.book.image
                                                }
                                                alt={
                                                    item.book.title
                                                }
                                            />
                                        ) : (
                                            <span>
                                                📚
                                            </span>
                                        )}
                                    </div>

                                    <div className="cart-item-info">

                                        <h2>
                                            {item.book.title}
                                        </h2>

                                        <p>
                                            Author:{" "}
                                            {item.book.author}
                                        </p>

                                        <p className="cart-price">
                                            ₹
                                            {
                                                item.book.price
                                            }
                                        </p>

                                        <div className="quantity-controls">

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.book
                                                            ._id,
                                                        -1
                                                    )
                                                }
                                                disabled={
                                                    item.quantity ===
                                                    1
                                                }
                                            >
                                                −
                                            </button>

                                            <span>
                                                {
                                                    item.quantity
                                                }
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.book
                                                            ._id,
                                                        1
                                                    )
                                                }
                                            >
                                                +
                                            </button>

                                        </div>

                                        <p>
                                            Subtotal: ₹
                                            {
                                                item.book
                                                    .price *
                                                    item.quantity
                                            }
                                        </p>

                                        <button
                                            onClick={() =>
                                                removeFromCart(
                                                    item.book
                                                        ._id
                                                )
                                            }
                                            className="remove-button"
                                        >
                                            Remove
                                        </button>

                                    </div>

                                </div>
                            ))}

                        </div>

                        <div className="cart-summary">

                            <h2>Order Summary</h2>

                            <div className="summary-row">
                                <span>
                                    Items
                                </span>

                                <span>
                                    {cartItems.reduce(
                                        (
                                            total,
                                            item
                                        ) =>
                                            total +
                                            item.quantity,
                                        0
                                    )}
                                </span>
                            </div>

                            <div className="summary-row total-row">
                                <span>
                                    Total
                                </span>

                                <span>
                                    ₹{totalPrice}
                                </span>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="checkout-button"
                            >
                                Checkout
                            </button>

                        </div>

                    </div>
                )}

            </main>
        </div>
    );
};

export default Cart;