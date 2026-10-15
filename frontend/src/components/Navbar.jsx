import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">
                    📚 Bookstore
                </Link>
            </div>

            <div className="navbar-links">
                <Link to="/">
                    Home
                </Link>

                <Link to="/cart">
                    Cart
                </Link>

                <Link to="/orders">
                    My Orders
                </Link>

                {user?.role === "admin" && (
                    <Link to="/admin">
                        Admin Dashboard
                    </Link>
                )}

                {user && (
                    <>
                        <span className="welcome">
                            Welcome, {user.name}
                        </span>

                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;