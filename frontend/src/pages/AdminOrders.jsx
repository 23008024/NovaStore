import { useEffect, useState } from "react";
import api from "../api/axios";
import AdminLayout from "../layouts/AdminLayout";

export default function AdminOrders() {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadOrders = async () => {

        try {

            const res = await api.get("/admin/orders");

            setOrders(res.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadOrders();

    }, []);

    const updateStatus = async (id, status) => {

        try {

            await api.put(`/admin/orders/${id}`, {

                status

            });

            loadOrders();

        } catch (error) {

            console.log(error);

            alert("Failed to update order.");

        }

    };

    if (loading) {

        return (

            <AdminLayout>

                <div className="text-center text-xl">

                    Loading Orders...

                </div>

            </AdminLayout>

        );

    }

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-8">

                Orders

            </h1>

            <div className="bg-white rounded-xl shadow overflow-x-auto">

                <table className="w-full">

                    <thead className="bg-gray-100">

                        <tr>

                            <th className="p-4 text-left">Customer</th>

                            <th>Total</th>

                            <th>Status</th>

                            <th>Date</th>

                            <th>Products</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            orders.map(order => (

                                <tr
                                    key={order.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        <div>

                                            <p className="font-semibold">

                                                {order.user.name}

                                            </p>

                                            <p className="text-sm text-gray-500">

                                                {order.user.email}

                                            </p>

                                        </div>

                                    </td>

                                    <td>

                                        R {order.total}

                                    </td>

                                    <td>

                                        <select

                                            value={order.status}

                                            onChange={(e) =>
                                                updateStatus(
                                                    order.id,
                                                    e.target.value
                                                )
                                            }

                                            className="border rounded p-2"

                                        >

                                            <option value="PENDING">

                                                Pending

                                            </option>

                                            <option value="PROCESSING">

                                                Processing

                                            </option>

                                            <option value="SHIPPED">

                                                Shipped

                                            </option>

                                            <option value="DELIVERED">

                                                Delivered

                                            </option>

                                            <option value="CANCELLED">

                                                Cancelled

                                            </option>

                                        </select>

                                    </td>

                                    <td>

                                        {

                                            new Date(

                                                order.createdAt

                                            ).toLocaleDateString()

                                        }

                                    </td>

                                    <td>

                                        {

                                            order.items.map(item => (

                                                <div
                                                    key={item.id}
                                                    className="mb-2"
                                                >

                                                    <strong>

                                                        {item.product.name}

                                                    </strong>

                                                    <br />

                                                    Qty: {item.quantity}

                                                </div>

                                            ))

                                        }

                                    </td>

                                </tr>

                            ))

                        }

                    </tbody>

                </table>

            </div>

        </AdminLayout>

    );

}