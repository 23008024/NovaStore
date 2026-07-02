import { Link } from "react-router-dom";


export default function Footer(){


    return (

        <footer className="bg-gray-900 text-white mt-16">


            <div className="max-w-7xl mx-auto px-6 py-12 grid sm:grid-cols-2 md:grid-cols-4 gap-10">



                {/* Brand */}


                <div>


                    <h2 className="text-3xl font-bold text-blue-400 mb-4">

                        NovaStore

                    </h2>


                    <p className="text-gray-400 leading-relaxed">

                        Your modern online marketplace for quality
                        products, secure shopping, and fast delivery.

                    </p>


                </div>






                {/* Navigation */}


                <div>


                    <h3 className="font-semibold text-lg mb-4">

                        Explore

                    </h3>



                    <ul className="space-y-3 text-gray-400">


                        <li>

                            <Link
                                to="/"
                                className="hover:text-white"
                            >
                                Home
                            </Link>

                        </li>



                        <li>

                            <Link
                                to="/products"
                                className="hover:text-white"
                            >
                                Products
                            </Link>

                        </li>



                        <li>

                            <Link
                                to="/cart"
                                className="hover:text-white"
                            >
                                Cart
                            </Link>

                        </li>



                        <li>

                            <Link
                                to="/orders"
                                className="hover:text-white"
                            >
                                Orders
                            </Link>

                        </li>


                    </ul>


                </div>







                {/* Support */}


                <div>


                    <h3 className="font-semibold text-lg mb-4">

                        Customer Support

                    </h3>


                    <ul className="space-y-3 text-gray-400">


                        <li>
                            support@novastore.com
                        </li>


                        <li>
                            Secure Payments
                        </li>


                        <li>
                            Fast Delivery
                        </li>


                        <li>
                            24/7 Customer Service
                        </li>


                    </ul>


                </div>







                {/* Social */}


                <div>


                    <h3 className="font-semibold text-lg mb-4">

                        Follow Us

                    </h3>


                    <div className="flex gap-4">


                        <span className="cursor-pointer hover:text-blue-400">

                            Facebook

                        </span>


                        <span className="cursor-pointer hover:text-blue-400">

                            Instagram

                        </span>


                        <span className="cursor-pointer hover:text-blue-400">

                            X

                        </span>


                    </div>


                </div>




            </div>







            <div className="border-t border-gray-700 text-center py-5 text-gray-400">


                © 2026 NovaStore. All rights reserved.


            </div>




        </footer>

    );

}