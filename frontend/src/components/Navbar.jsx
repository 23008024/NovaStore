import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


export default function Navbar(){

    const [open,setOpen] = useState(false);

    const { user, logout } = useAuth();



    const closeMenu = ()=>{

        setOpen(false);

    };



    return (

        <nav className="bg-white shadow-md sticky top-0 z-50">


            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">


                {/* Logo */}

                <Link
                    to="/"
                    className="text-3xl font-bold text-blue-600"
                >
                    NovaStore
                </Link>




                {/* Desktop Menu */}

                <div className="hidden md:flex items-center gap-8">


                    <Link
                        to="/"
                        className="hover:text-blue-600"
                    >
                        Home
                    </Link>



                    <Link
                        to="/products"
                        className="hover:text-blue-600"
                    >
                        Products
                    </Link>



                    <Link
                        to="/cart"
                        className="hover:text-blue-600"
                    >
                        Cart
                    </Link>



                    {
                    user &&

                    <Link
                        to="/orders"
                        className="hover:text-blue-600"
                    >
                        Orders
                    </Link>

                    }



                    {
                    !user ?

                    <>
<Link
    to="/admin"
    className="hover:text-blue-600"
>
    Admin
</Link>

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


                    :

                    <button

                    onClick={logout}

                    className="bg-red-500 text-white px-5 py-2 rounded-xl"

                    >

                        Logout

                    </button>

                    }


                </div>






                {/* Mobile Hamburger */}

                <button

                    onClick={()=>setOpen(!open)}

                    className="md:hidden text-3xl"

                >

                    ☰

                </button>



            </div>







            {/* Mobile Menu */}


            {

            open &&

            (

            <div className="md:hidden px-6 pb-6 flex flex-col gap-5">


                <Link
                    onClick={closeMenu}
                    to="/"
                >
                    Home
                </Link>



                <Link
                    onClick={closeMenu}
                    to="/products"
                >
                    Products
                </Link>



                <Link
                    onClick={closeMenu}
                    to="/cart"
                >
                    Cart
                </Link>



                {
                user &&

                <Link
                    onClick={closeMenu}
                    to="/orders"
                >
                    Orders
                </Link>
                }



                {

                !user ?

                <>

                <Link
                    onClick={closeMenu}
                    to="/login"
                >
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


                :

                <button

                onClick={()=>{

                    logout();

                    closeMenu();

                }}

                className="bg-red-500 text-white px-4 py-2 rounded-lg"

                >

                    Logout

                </button>


                }


            </div>

            )

            }



        </nav>

    );

}
