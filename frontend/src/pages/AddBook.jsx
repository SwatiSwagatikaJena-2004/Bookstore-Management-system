import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

const AddBook = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        price: "",
        genre: "",
        stock: "",
        ISBN: "",
        description: "",
        image: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        const price = Number(formData.price);
        const stock = Number(formData.stock);

        // Frontend validation
        if (price < 0) {
            setError("Price cannot be negative.");
            return;
        }

        if (stock < 0) {
            setError("Stock cannot be negative.");
            return;
        }

        if (price === 0) {
            setError("Price must be greater than 0.");
            return;
        }

        if (!formData.ISBN.trim()) {
            setError("ISBN is required.");
            return;
        }

        try {
            await API.post("/books", {
                ...formData,
                title: formData.title.trim(),
                author: formData.author.trim(),
                genre: formData.genre.trim(),
                ISBN: formData.ISBN.trim(),
                description: formData.description.trim(),
                image: formData.image.trim(),
                price: price,
                stock: stock
            });

            alert("Book added successfully!");

            navigate("/admin/books");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Failed to add book."
            );
        }
    };

    return (
        <div>
            <Navbar />

            <main className="admin-form-container">
                <div className="admin-form-card">

                    <h1>📚 Add New Book</h1>

                    <p className="form-description">
                        Add a new book to your bookstore inventory.
                    </p>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        className="admin-book-form"
                    >

                        <div className="form-group">
                            <label>Book Title</label>

                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="Enter book title"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Author</label>

                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="Enter author name"
                                required
                            />
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label>Price</label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    min="1"
                                    step="0.01"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Stock</label>

                                <input
                                    type="number"
                                    name="stock"
                                    value={formData.stock}
                                    onChange={handleChange}
                                    placeholder="Enter stock"
                                    min="0"
                                    required
                                />
                            </div>

                        </div>

                        <div className="form-group">
                            <label>Genre</label>

                            <input
                                type="text"
                                name="genre"
                                value={formData.genre}
                                onChange={handleChange}
                                placeholder="e.g. Fiction"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>ISBN</label>

                            <input
                                type="text"
                                name="ISBN"
                                value={formData.ISBN}
                                onChange={handleChange}
                                placeholder="Enter ISBN"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Image URL</label>

                            <input
                                type="url"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                placeholder="Enter book image URL"
                            />
                        </div>

                        <div className="form-group">
                            <label>Description</label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Enter book description"
                                rows="5"
                            />
                        </div>

                        <div className="form-actions">

                            <button
                                type="submit"
                                className="save-button"
                            >
                                Add Book
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/admin/books")
                                }
                                className="cancel-button"
                            >
                                Cancel
                            </button>

                        </div>

                    </form>
                </div>
            </main>
        </div>
    );
};

export default AddBook;