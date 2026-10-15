import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import AdminStats from "./AdminStats";

const AdminDashboard = () => {
    const { user } = useAuth();

    return (
        <div>
            <Navbar />

            <main className="admin-dashboard-container">

                <div className="admin-header">
                    <h1>⚙️ Admin Dashboard</h1>

                    <p>
                        Welcome, {user?.name}!
                    </p>

                    <p>
                        Manage your bookstore from
                        here.
                    </p>
                </div>

                <AdminStats />

                <section className="admin-options">

                    <h2>Admin Options</h2>

                    <div className="admin-option-grid">

                        <Link to="/admin/books">
                            <div className="admin-option-card">
                                <div className="admin-option-icon">
                                    📚
                                </div>

                                <h3>
                                    Manage Books
                                </h3>

                                <p>
                                    Add, edit and delete
                                    books.
                                </p>
                            </div>
                        </Link>

                        <Link to="/admin/orders">
                            <div className="admin-option-card">
                                <div className="admin-option-icon">
                                    📦
                                </div>

                                <h3>
                                    Manage Orders
                                </h3>

                                <p>
                                    View orders and
                                    update their status.
                                </p>
                            </div>
                        </Link>

                        <Link to="/admin/stats">
                            <div className="admin-option-card">
                                <div className="admin-option-icon">
                                    📊
                                </div>

                                <h3>
                                    View Statistics
                                </h3>

                                <p>
                                    View bookstore
                                    statistics.
                                </p>
                            </div>
                        </Link>

                    </div>

                </section>

            </main>
        </div>
    );
};

export default AdminDashboard;