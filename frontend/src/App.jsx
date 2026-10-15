import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import OrderDetails from "./pages/OrderDetails";

import AdminDashboard from "./pages/AdminDashboard";
import AdminBooks from "./pages/AdminBooks";
import AddBook from "./pages/AddBook";
import EditBook from "./pages/EditBook";
import AdminOrders from "./pages/AdminOrders";
import AdminStats from "./pages/AdminStats";

import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Login */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Register */}
                <Route
                    path="/register"
                    element={<Register />}
                />

                {/* Home */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Home />
                        </ProtectedRoute>
                    }
                />

                {/* Book Details */}
                <Route
                    path="/books/:id"
                    element={
                        <ProtectedRoute>
                            <BookDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Cart */}
                <Route
                    path="/cart"
                    element={
                        <ProtectedRoute>
                            <Cart />
                        </ProtectedRoute>
                    }
                />

                {/* My Orders */}
                <Route
                    path="/orders"
                    element={
                        <ProtectedRoute>
                            <MyOrders />
                        </ProtectedRoute>
                    }
                />

                {/* Order Details */}
                <Route
                    path="/orders/:id"
                    element={
                        <ProtectedRoute>
                            <OrderDetails />
                        </ProtectedRoute>
                    }
                />

                {/* Admin Dashboard */}
                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                {/* Admin Books */}
                <Route
                    path="/admin/books"
                    element={
                        <AdminRoute>
                            <AdminBooks />
                        </AdminRoute>
                    }
                />

                {/* Add Book */}
                <Route
                    path="/admin/books/add"
                    element={
                        <AdminRoute>
                            <AddBook />
                        </AdminRoute>
                    }
                />

                {/* Edit Book */}
                <Route
                    path="/admin/books/edit/:id"
                    element={
                        <AdminRoute>
                            <EditBook />
                        </AdminRoute>
                    }
                />

                {/* Admin Orders */}
                <Route
                    path="/admin/orders"
                    element={
                        <AdminRoute>
                            <AdminOrders />
                        </AdminRoute>
                    }
                />

                {/* Admin Statistics */}
                <Route
                    path="/admin/stats"
                    element={
                        <AdminRoute>
                            <AdminStats />
                        </AdminRoute>
                    }
                />

                {/* Unknown URL */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/"
                            replace
                        />
                    }
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;