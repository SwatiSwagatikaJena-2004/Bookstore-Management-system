import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
    const addToCart = () => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        const existingItem = cart.find(
            (item) => item.book._id === book._id
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                book: book,
                quantity: 1
            });
        }

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );

        alert("Book added to cart!");
    };

    return (
        <div className="book-card">

            <div className="book-image-container">
                {book.image ? (
                    <img
                        src={book.image}
                        alt={book.title}
                        className="book-image"
                    />
                ) : (
                    <div className="no-image">
                        📚
                    </div>
                )}
            </div>

            <div className="book-info">

                <h3>{book.title}</h3>

                <p>
                    <strong>Author:</strong>{" "}
                    {book.author}
                </p>

                <p>
                    <strong>Genre:</strong>{" "}
                    {book.genre}
                </p>

                <p className="book-price">
                    ₹{book.price}
                </p>

                <p>
                    <strong>Stock:</strong>{" "}
                    {book.stock}
                </p>

                <button
                    onClick={addToCart}
                    disabled={book.stock === 0}
                    className="cart-button"
                >
                    {book.stock === 0
                        ? "Out of Stock"
                        : "Add to Cart"}
                </button>

                <Link
                    to={`/books/${book._id}`}
                    className="details-link"
                >
                    View Details
                </Link>

            </div>

        </div>
    );
};

export default BookCard;