import { useEffect, useState } from "react";
import AdminLayout from "../layouts/AdminLayout";
import api from "../api/axios";

export default function AdminProducts() {

    const emptyForm = {

        name: "",

        description: "",

        price: "",

        stock: "",

        image: ""

    };

    const [products, setProducts] = useState([]);

    const [form, setForm] = useState(emptyForm);

    const [editing, setEditing] = useState(null);

    const [loading, setLoading] = useState(true);

    const loadProducts = async () => {

        try {

            const res = await api.get("/admin/products");

            setProducts(res.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        loadProducts();

    }, []);

    const change = (e) => {

        setForm({

            ...form,

            [e.target.name]: e.target.value

        });

    };

    const submit = async (e) => {

        e.preventDefault();

        try {

            if (editing) {

                await api.put(`/admin/products/${editing}`, form);

            } else {

                await api.post("/admin/products", form);

            }

            setForm(emptyForm);

            setEditing(null);

            loadProducts();

        } catch (error) {

            console.log(error);

            alert("Unable to save product");

        }

    };

    const edit = (product) => {

        setEditing(product.id);

        setForm({

            name: product.name,

            description: product.description,

            price: product.price,

            stock: product.stock,

            image: product.image

        });

    };

    const remove = async (id) => {

        if (!window.confirm("Delete this product?")) {

            return;

        }

        try {

            await api.delete(`/admin/products/${id}`);

            loadProducts();

        } catch (error) {

            console.log(error);

        }

    };

    return (

        <AdminLayout>

            <h1 className="text-3xl font-bold mb-6">

                Product Management

            </h1>

            <form
                onSubmit={submit}
                className="bg-white shadow rounded-xl p-6 mb-10"
            >

                <div className="grid md:grid-cols-2 gap-4">

                    <input
                        name="name"
                        placeholder="Product Name"
                        value={form.name}
                        onChange={change}
                        className="border p-3 rounded"
                        required
                    />

                    <input
                        name="price"
                        type="number"
                        placeholder="Price"
                        value={form.price}
                        onChange={change}
                        className="border p-3 rounded"
                        required
                    />

                    <input
                        name="stock"
                        type="number"
                        placeholder="Stock"
                        value={form.stock}
                        onChange={change}
                        className="border p-3 rounded"
                        required
                    />

                    <input
                        name="image"
                        placeholder="Image URL"
                        value={form.image}
                        onChange={change}
                        className="border p-3 rounded"
                    />

                </div>

                <textarea
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={change}
                    className="border p-3 rounded w-full mt-4"
                    rows="4"
                />

                <button
                    className="mt-5 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    {editing ? "Update Product" : "Add Product"}
                </button>

            </form>

            {loading ? (

                <p>Loading...</p>

            ) : (

                <div className="bg-white rounded-xl shadow overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-100">

                            <tr>

                                <th className="p-4">Image</th>

                                <th>Name</th>

                                <th>Price</th>

                                <th>Stock</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {products.map((product) => (

                                <tr
                                    key={product.id}
                                    className="border-t"
                                >

                                    <td className="p-4">

                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-16 h-16 object-cover rounded"
                                        />

                                    </td>

                                    <td>{product.name}</td>

                                    <td>R {product.price}</td>

                                    <td>{product.stock}</td>

                                    <td>

                                        <button
                                            onClick={() => edit(product)}
                                            className="bg-yellow-500 text-white px-3 py-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => remove(product.id)}
                                            className="bg-red-600 text-white px-3 py-2 rounded"
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            )}

        </AdminLayout>

    );

}