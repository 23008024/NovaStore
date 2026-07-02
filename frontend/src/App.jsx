import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Register from "./pages/Register";

import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";

import AdminRoute from "./routes/AdminRoute";
import AdminOrders from "./pages/AdminOrders";
import AdminUsers from "./pages/AdminUsers";
import AdminCategories from "./pages/AdminCategories";
export default function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ==========================
                   CUSTOMER WEBSITE
                =========================== */}

                <Route
                    path="/"
                    element={
                        <MainLayout>

                            <Home />

                        </MainLayout>
                    }
                />

                <Route
                    path="/products"
                    element={
                        <MainLayout>

                            <Products />

                        </MainLayout>
                    }
                />

                <Route
                    path="/cart"
                    element={
                        <MainLayout>

                            <Cart />

                        </MainLayout>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <MainLayout>

                            <Orders />

                        </MainLayout>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <MainLayout>

                            <Login />

                        </MainLayout>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <MainLayout>

                            <Register />

                        </MainLayout>
                    }
                />

                {/* ==========================
                   ADMIN
                =========================== */}

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>

                            <AdminDashboard />

                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/products"
                    element={
                        <AdminRoute>

                            <AdminProducts />

                        </AdminRoute>
                    }
                />





<Route
    path="/admin/orders"
    element={
        <AdminRoute>
            <AdminOrders />
        </AdminRoute>
    }
/>
<Route
    path="/admin/users"
    element={
        <AdminRoute>
            <AdminUsers />
        </AdminRoute>
    }
/>

<Route
    path="/admin/categories"
    element={
        <AdminRoute>
            <AdminCategories />
        </AdminRoute>
    }
/>


            </Routes>

        </BrowserRouter>

    );

}