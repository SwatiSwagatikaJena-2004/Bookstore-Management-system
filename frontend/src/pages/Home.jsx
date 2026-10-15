import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import BookCard from "../components/BookCard";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";
import { getBooks } from "../services/api";

const Home = () => {
    const { user } = useAuth();

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchBooks = async (
        searchValue = "",
        pageNumber = 1
    ) => {
        try {
            setLoading(true);

            const data = await getBooks(
                searchValue,
                pageNumber,
                5
            );

            setBooks(data.books);
            setPage(data.currentPage);
            setTotalPages(data.totalPages);
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

    const handleSearch = (searchValue) => {
        setSearch(searchValue);
        setPage(1);

        fetchBooks(searchValue, 1);
    };

    const handlePrevious = () => {
        if (page > 1) {
            fetchBooks(search, page - 1);
        }
    };

    const handleNext = () => {
        if (page < totalPages) {
            fetchBooks(search, page + 1);
        }
    };

    return (
        <div>
            <Navbar />

            <main className="home-container">

                <section className="home-header">
                    <h1>📚 Bookstore</h1>

                    <h2>
                        Welcome, {user?.name}!
                    </h2>

                    <p>
                        Find your next favorite book.
                    </p>
                </section>

                <div className="search-container">
                    <SearchBar
                        onSearch={handleSearch}
                    />
                </div>

                <h2 className="section-title">
                    {search
                        ? `Search results for "${search}"`
                        : "Available Books"}
                </h2>

                {loading ? (
                    <Loading />
                ) : books.length === 0 ? (
                    <p className="no-books">
                        No books found.
                    </p>
                ) : (
                    <div className="books-grid">
                        {books.map((book) => (
                            <BookCard
                                key={book._id}
                                book={book}
                            />
                        ))}
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="pagination">

                        <button
                            onClick={handlePrevious}
                            disabled={page === 1}
                        >
                            Previous
                        </button>

                        <span>
                            Page {page} of {totalPages}
                        </span>

                        <button
                            onClick={handleNext}
                            disabled={
                                page === totalPages
                            }
                        >
                            Next
                        </button>

                    </div>
                )}

            </main>
        </div>
    );
};

export default Home;