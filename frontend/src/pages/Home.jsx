import { Link } from "react-router-dom";

export default function Home() {

    const features = [
        {
            icon: "🚚",
            title: "Fast Delivery",
            text: "Quick and reliable shipping across the country."
        },
        {
            icon: "🔒",
            title: "Secure Payments",
            text: "Shop confidently with protected transactions."
        },
        {
            icon: "⭐",
            title: "Premium Quality",
            text: "Only trusted brands and quality products."
        },
        {
            icon: "📞",
            title: "24/7 Support",
            text: "Our support team is always ready to help."
        }
    ];

    const categories = [
        "💻 Electronics",
        "📱 Smartphones",
        "👕 Fashion",
        "⌚ Accessories",
        "🏠 Home",
        "🎮 Gaming"
    ];

    return (

        <>

            {/* Hero Section */}

            <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white">

                <div className="max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-12 items-center">

                    <div>

                        <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight">

                            Shop Smarter.<br />

                            Live Better.

                        </h1>

                        <p className="mt-6 text-lg text-blue-100">

                            Discover premium products at unbeatable prices.
                            NovaStore makes shopping fast, secure, and enjoyable.

                        </p>

                        <div className="mt-10 flex flex-wrap gap-4">

                            <Link
                                to="/products"
                                className="bg-white text-blue-700 px-7 py-3 rounded-xl font-semibold hover:bg-gray-100"
                            >
                                Shop Now
                            </Link>

                            <Link
                                to="/register"
                                className="border border-white px-7 py-3 rounded-xl hover:bg-white hover:text-blue-700"
                            >
                                Join NovaStore
                            </Link>

                        </div>

                    </div>

                    <div className="hidden lg:flex justify-center">

                        <img
                            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900"
                            alt="Shopping"
                            className="rounded-3xl shadow-2xl"
                        />

                    </div>

                </div>

            </section>

            {/* Features */}

            <section className="max-w-7xl mx-auto px-6 py-20">

                <h2 className="text-4xl font-bold text-center mb-12">

                    Why Choose NovaStore?

                </h2>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

                    {features.map((feature, index) => (

                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-lg p-8 text-center hover:-translate-y-2 transition"
                        >

                            <div className="text-5xl">

                                {feature.icon}

                            </div>

                            <h3 className="text-xl font-semibold mt-5">

                                {feature.title}

                            </h3>

                            <p className="text-gray-600 mt-3">

                                {feature.text}

                            </p>

                        </div>

                    ))}

                </div>

            </section>

            {/* Categories */}

            <section className="bg-gray-100 py-20">

                <div className="max-w-7xl mx-auto px-6">

                    <h2 className="text-4xl font-bold text-center mb-12">

                        Shop by Category

                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

                        {categories.map((category) => (

                            <div
                                key={category}
                                className="bg-white rounded-xl shadow p-8 text-center font-semibold hover:bg-blue-600 hover:text-white transition cursor-pointer"
                            >

                                {category}

                            </div>

                        ))}

                    </div>

                </div>

            </section>

            {/* Call to Action */}

            <section className="bg-blue-700 text-white py-24">

                <div className="max-w-5xl mx-auto text-center px-6">

                    <h2 className="text-5xl font-bold">

                        Ready to Start Shopping?

                    </h2>

                    <p className="mt-6 text-xl text-blue-100">

                        Thousands of customers trust NovaStore every day.

                    </p>

                    <Link
                        to="/products"
                        className="inline-block mt-10 bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100"
                    >
                        Explore Products
                    </Link>

                </div>

            </section>

        </>

    );

}