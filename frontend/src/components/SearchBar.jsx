import { useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [search, setSearch] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(search);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="search-bar"
        >
            <input
                type="text"
                placeholder="Search by title or author..."
                value={search}
                onChange={(e) =>
                    setSearch(e.target.value)
                }
            />

            <button type="submit">
                Search
            </button>
        </form>
    );
};

export default SearchBar;