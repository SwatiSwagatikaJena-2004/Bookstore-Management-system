import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookById } from "../services/api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const BookDetails = () => {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const data = await getBookById(id);
                setBook(data);
            } catch (error) {
                console.error(
                    "Failed to fetch book:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!book) {
        return (
            <div>
                <Navbar />

                <div className="page-container">
                    <p>Book not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />

            <main className="book-details-container">

                <div className="book-details-card">

                    <div className="book-details-image">

                        {book.image ? (
                            <img
                                src={book.image}
                                alt={book.title}
                            />
                        ) : (
                            <div className="details-no-image">
                                📚
                            </div>
                        )}

                    </div>

                    <div className="book-details-info">

                        <h1>{book.title}</h1>

                        <p>
                            <strong>Author:</strong>{" "}
                            {book.author}
                        </p>

                        <p>
                            <strong>Genre:</strong>{" "}
                            {book.genre}
                        </p>

                        <p className="details-price">
                            ₹{book.price}
                        </p>

                        <p>
                            <strong>Stock:</strong>{" "}
                            {book.stock}
                        </p>

                        <p>
                            <strong>ISBN:</strong>{" "}
                            {book.ISBN}
                        </p>

                        <div className="description">
                            <h3>Description</h3>

                            <p>
                                {book.description ||
                                    "No description available."}
                            </p>
                        </div>

                    </div>

                </div>

            </main>
        </div>
    );
};

export default BookDetails;