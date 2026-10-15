import { useEffect, useState } from "react";
import API from "../services/api";
import Loading from "../components/Loading";

const AdminStats = () => {
    const [stats, setStats] = useState({
        totalBooks: 0,
        totalOrders: 0,
        pendingOrders: 0,
        customersWithOrders: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [booksResponse, ordersResponse] =
                    await Promise.all([
                        API.get("/books"),
                        API.get("/orders")
                    ]);

                const orders = ordersResponse.data;

                const pendingOrders = orders.filter(
                    (order) =>
                        order.status === "Pending"
                ).length;

                const customerIds = new Set(
                    orders
                        .map(
                            (order) =>
                                order.user?._id
                        )
                        .filter(Boolean)
                );

                setStats({
                    totalBooks:
                        booksResponse.data.totalBooks,
                    totalOrders:
                        orders.length,
                    pendingOrders:
                        pendingOrders,
                    customersWithOrders:
                        customerIds.size
                });
            } catch (error) {
                console.error(
                    "Failed to fetch statistics:",
                    error
                );
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) {
        return <Loading />;
    }

    return (
        <section className="stats-section">

            <h2>📊 Store Statistics</h2>

            <div className="stats-grid">

                <div className="stat-card">
                    <div className="stat-icon">
                        📚
                    </div>

                    <h3>Total Books</h3>

                    <p>{stats.totalBooks}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        📦
                    </div>

                    <h3>Total Orders</h3>

                    <p>{stats.totalOrders}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        ⏳
                    </div>

                    <h3>Pending Orders</h3>

                    <p>{stats.pendingOrders}</p>
                </div>

                <div className="stat-card">
                    <div className="stat-icon">
                        👥
                    </div>

                    <h3>Customers With Orders</h3>

                    <p>
                        {stats.customersWithOrders}
                    </p>
                </div>

            </div>

        </section>
    );
};

export default AdminStats;