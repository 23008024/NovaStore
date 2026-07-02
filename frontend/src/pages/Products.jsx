import { useEffect, useState } from "react";
import api from "../api/axios";

export default function Products() {

    const [products, setProducts] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {

        const list = products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        );

        setFiltered(list);

    }, [search, products]);

    const fetchProducts = async () => {

        try {

            const res = await api.get("/products");

            setProducts(res.data.data);
            setFiltered(res.data.data);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);

        }

    };

    const addToCart = async (productId) => {

        try {

            await api.post("/cart", {

                productId,
                quantity: 1

            });

            alert("Product added to cart!");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add to cart"
            );

        }

    };

    if (loading) {

        return (

            <div className="text-center py-20 text-xl">

                Loading products...

            </div>

        );

    }

    return (

        <div className="max-w-7xl mx-auto px-6 py-10">

            <h1 className="text-4xl font-bold mb-8">

                Shop Products

            </h1>

            <input

                value={search}

                onChange={(e) => setSearch(e.target.value)}

                placeholder="Search products..."

                className="w-full mb-8 px-5 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"

            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {

                    filtered.map(product => (

                        <div
                            key={product.id}
                            className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
                        >

                            <img
                                src={
                                    product.image ||
                                    "https://via.placeholder.com/500x350?text=NovaStore"
                                }
                                alt={product.name}
                                className="w-full h-56 object-cover"
                            />

                            <div className="p-5">

                                <h2 className="text-xl font-semibold">

                                    {product.name}

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    {product.description}

                                </p>

                                <div className="flex justify-between items-center mt-5">

                                    <span className="text-2xl font-bold text-blue-600">

                                        R {product.price}

                                    </span>

                                    <span className="text-sm text-green-600">

                                        Stock: {product.stock}

                                    </span>

                                </div>

                                <button

                                    onClick={() => addToCart(product.id)}

                                    className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"

                                >

                                    Add to Cart

                                </button>

                            </div>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}