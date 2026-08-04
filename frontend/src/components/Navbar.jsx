import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

    const [open, setOpen] = useState(false);

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const closeMenu = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        logout();
        closeMenu();
        navigate("/login");
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">

            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-600"
                >
                    NovaStore
                </Link>

                <div className="hidden md:flex items-center gap-8">

                    <Link to="/" className="hover:text-blue-600">
                        Home
                    </Link>

                    <Link to="/products" className="hover:text-blue-600">
                        Products
                    </Link>

                    <Link to="/cart" className="hover:text-blue-600">
                        Cart
                    </Link>

                    {user && (
                        <Link to="/orders" className="hover:text-blue-600">
                            Orders
                        </Link>
                    )}

                    {!user ? (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-blue-600"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="bg-blue-600 text-white px-5 py-2 rounded-xl hover:bg-blue-700"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
                        >
                            Logout
                        </button>
                    )}

                </div>

                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden text-3xl"
                >
                    ☰
                </button>

            </div>

            {open && (
                <div className="md:hidden px-6 pb-6 flex flex-col gap-5">

                    <Link onClick={closeMenu} to="/">Home</Link>
                    <Link onClick={closeMenu} to="/products">Products</Link>
                    <Link onClick={closeMenu} to="/cart">Cart</Link>

                    {user && (
                        <Link onClick={closeMenu} to="/orders">
                            Orders
                        </Link>
                    )}

                    {!user ? (
                        <>
                            <Link onClick={closeMenu} to="/login">
                                Login
                            </Link>

                            <Link
                                onClick={closeMenu}
                                to="/register"
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center"
                            >
                                Register
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg"
                        >
                            Logout
                        </button>
                    )}

                </div>
            )}

        </nav>
    );
}
