import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminDashboard() {

    const [stats, setStats] = useState({

        users: 0,

        products: 0,

        orders: 0,

        revenue: 0

    });

    const [loading, setLoading] = useState(true);

    const loadDashboard = async () => {

        try {

            const res = await api.get("/admin/dashboard");

            setStats(res.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadDashboard();

    }, []);

    if (loading) {

        return (

            <AdminLayout>

                <div className="text-center text-xl">

                    Loading dashboard...

                </div>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <h1 className="text-4xl font-bold mb-8">

                Dashboard

            </h1>

            <div className="grid md:grid-cols-4 gap-6">

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <p className="text-gray-500">

                        Products

                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-blue-600">

                        {stats.products}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <p className="text-gray-500">

                        Users

                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-green-600">

                        {stats.users}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <p className="text-gray-500">

                        Orders

                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-orange-600">

                        {stats.orders}

                    </h2>

                </div>

                <div className="bg-white rounded-2xl shadow-lg p-6">

                    <p className="text-gray-500">

                        Revenue

                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-red-600">

                        R {stats.revenue}

                    </h2>

                </div>

            </div>

        </AdminLayout>

    );

}