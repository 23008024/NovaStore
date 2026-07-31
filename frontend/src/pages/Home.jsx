import { Link } from "react-router-dom";
import profile from "../assets/profile.jpeg";
import {
  FaLinkedin,
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
} from "react-icons/fa";

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

                    <div className="flex justify-center">

    <div className="bg-white text-gray-800 rounded-3xl shadow-2xl p-8 text-center max-w-sm">

        <img
            src={profile}
            alt="Naftali Mudau"
            className="w-56 h-56 rounded-full object-cover border-4 border-blue-600 mx-auto"
        />

        <h2 className="text-3xl font-bold mt-6">
            Naftali Mudau
        </h2>

        <p className="text-gray-500 mt-2">
            Full Stack Web Developer
        </p>

        <div className="mt-6 space-y-3 text-left">

            <a
                href="tel:0608158836"
                className="flex items-center gap-3 hover:text-blue-600"
            >
                <FaPhoneAlt />
                060 815 8836
            </a>

            <a
                href="mailto:mudaunaftali@gmail.com"
                className="flex items-center gap-3 hover:text-blue-600"
            >
                <FaEnvelope />
                mudaunaftali@gmail.com
            </a>

            <a
                href="https://wa.me/27608158836"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-green-600"
            >
                <FaWhatsapp />
                WhatsApp Me
            </a>

            <a
                href="https://www.linkedin.com/in/naftali-mudau-261a88314/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-700"
            >
                <FaLinkedin />
                LinkedIn Profile
            </a>

        </div>

    </div>

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
            <section className="py-20 bg-white">

    <div className="max-w-5xl mx-auto px-6">

        <div className="text-center">

            <h2 className="text-4xl font-bold mb-6">
                About Me
            </h2>

            <p className="text-lg text-gray-600 leading-8">
    <strong>NovaStore</strong> is a self-developed full-stack eCommerce web application that I designed, built, and deployed from the ground up to demonstrate my software development skills. I was responsible for every stage of the project, including planning the system architecture, designing the user interface, developing the frontend, building the backend, creating and managing the database, implementing authentication, integrating APIs, testing the application, fixing bugs, and deploying the final product online.

```
<br /><br />

The frontend was developed using <strong>React</strong>, <strong>JavaScript</strong>, <strong>Tailwind CSS</strong>, and <strong>Vite</strong> to create a fast, responsive, and user-friendly interface. The backend was built with <strong>Node.js</strong> and <strong>Express.js</strong>, providing secure RESTful APIs for user authentication, product management, shopping cart functionality, and order processing. <strong>MySQL</strong> was used as the relational database to store user accounts, products, orders, and other application data efficiently.

<br /><br />

Throughout the project, I implemented user registration and login, secure password handling, protected routes, role-based access, product catalog management, shopping cart functionality, responsive layouts, and database integration. I also managed version control with <strong>Git</strong> and <strong>GitHub</strong>, configured environment variables, and deployed the application to the cloud using <strong>Render</strong>. This project demonstrates my ability to independently develop, test, maintain, and deploy complete full-stack applications while following modern software development practices.

</p>


        </div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">

            <div className="bg-blue-50 rounded-2xl p-8 shadow">

                <h3 className="text-2xl font-bold mb-4">
                    Contact Information
                </h3>

                <p className="mb-3">
                    📞 060 815 8836
                </p>

                <p className="mb-3">
                    📧 mudaunaftali@gmail.com
                </p>

                <p>
                    💼 LinkedIn:
                </p>

                <a
                    href="https://www.linkedin.com/in/naftali-mudau-261a88314/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 break-all"
                >
                    linkedin.com/in/naftali-mudau-261a88314
                </a>

            </div>

            <div className="bg-gray-50 rounded-2xl p-8 shadow">

                <h3 className="text-2xl font-bold mb-4">
                    Skills
                </h3>

                <div className="flex flex-wrap gap-3">

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        React
                    </span>

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        JavaScript
                    </span>

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        Node.js
                    </span>

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        Express
                    </span>

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        MySQL
                    </span>

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        HTML
                    </span>

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        CSS
                    </span>

                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full">
                        Tailwind CSS
                    </span>

                </div>

            </div>

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
