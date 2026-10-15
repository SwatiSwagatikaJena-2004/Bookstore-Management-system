import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";

const AdminBooks = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBooks = async () => {
        try {
            setLoading(true);

            const response = await API.get(
                "/books?limit=100"
            );

            setBooks(response.data.books);
        } catch (error) {
            console.error(
                "Failed to fetch books:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const handleDelete = async (bookId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this book?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await API.delete(`/books/${bookId}`);

            alert("Book deleted successfully!");

            fetchBooks();
        } catch (error) {
            alert(
                error.response?.data?.message ||
                "Failed to delete book"
            );
        }
    };

    return (
        <div>
            <Navbar />

            <main className="admin-books-container">

                <div className="admin-page-header">
                    <div>
                        <h1>📚 Manage Books</h1>

                        <p>
                            Add, edit and manage your
                            bookstore inventory.
                        </p>
                    </div>

                    <Link to="/admin/books/add">
                        <button className="add-book-button">
                            + Add New Book
                        </button>
                    </Link>
                </div>

                {loading ? (
                    <Loading />
                ) : books.length === 0 ? (
                    <div className="empty-admin-state">
                        <h2>
                            No books available.
                        </h2>

                        <Link to="/admin/books/add">
                            <button>
                                Add Your First Book
                            </button>
                        </Link>
                    </div>
                ) : (
                    <div className="admin-books-grid">

                        {books.map((book) => (
                            <div
                                key={book._id}
                                className="admin-book-card"
                            >

                                <div className="admin-book-image">
                                    {book.image ? (
                                        <img
                                            src={
                                                book.image
                                            }
                                            alt={
                                                book.title
                                            }
                                        />
                                    ) : (
                                        <span>
                                            📚
                                        </span>
                                    )}
                                </div>

                                <div className="admin-book-info">

                                    <h2>
                                        {book.title}
                                    </h2>

                                    <p>
                                        <strong>
                                            Author:
                                        </strong>{" "}
                                        {book.author}
                                    </p>

                                    <p>
                                        <strong>
                                            Genre:
                                        </strong>{" "}
                                        {book.genre}
                                    </p>

                                    <p className="admin-book-price">
                                        ₹{book.price}
                                    </p>

                                    <p>
                                        <strong>
                                            Stock:
                                        </strong>{" "}
                                        {book.stock}
                                    </p>

                                    <p className="admin-book-isbn">
                                        ISBN: {book.ISBN}
                                    </p>

                                    <div className="admin-book-actions">

                                        <Link
                                            to={`/admin/books/edit/${book._id}`}
                                        >
                                            <button>
                                                Edit
                                            </button>
                                        </Link>

                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    book._id
                                                )
                                            }
                                            className="delete-button"
                                        >
                                            Delete
                                        </button>

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

export default AdminBooks;