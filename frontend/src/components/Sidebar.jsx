import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    LayoutDashboard,
    Package,
    ShoppingCart,
    Users,
    FolderTree,
    LogOut
} from "lucide-react";

export default function Sidebar() {

    const location = useLocation();

    const navigate = useNavigate();

    const { logout } = useAuth();

    const menu = [

        {
            title: "Dashboard",
            icon: <LayoutDashboard size={20} />,
            path: "/admin"
        },

        {
            title: "Products",
            icon: <Package size={20} />,
            path: "/admin/products"
        },

        {
            title: "Orders",
            icon: <ShoppingCart size={20} />,
            path: "/admin/orders"
        },

        {
            title: "Users",
            icon: <Users size={20} />,
            path: "/admin/users"
        },

        {
            title: "Categories",
            icon: <FolderTree size={20} />,
            path: "/admin/categories"
        }

    ];

    const handleLogout = () => {

        logout();

        navigate("/login");

    };

    return (

        <aside className="w-64 bg-slate-900 text-white min-h-screen flex flex-col justify-between">

            <div>

                <div className="text-3xl font-bold p-6 border-b border-slate-700">

                    NovaStore

                </div>

                <nav className="p-4 space-y-2">

                    {

                        menu.map(item => (

                            <Link

                                key={item.title}

                                to={item.path}

                                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition

                                ${location.pathname === item.path

                                    ? "bg-blue-600"

                                    : "hover:bg-slate-800"

                                }`}

                            >

                                {item.icon}

                                {item.title}

                            </Link>

                        ))

                    }

                </nav>

            </div>

            <div className="p-4 border-t border-slate-700">

                <button

                    onClick={handleLogout}

                    className="flex items-center gap-3 text-red-400 hover:text-red-300"

                >

                    <LogOut size={18} />

                    Logout

                </button>

            </div>

        </aside>

    );

}