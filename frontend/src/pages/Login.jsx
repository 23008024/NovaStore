import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Login(){


    const { login } = useAuth();

    const navigate = useNavigate();


    const [email,setEmail] = useState("");

    const [password,setPassword] = useState("");




    const submit = async(e)=>{

        e.preventDefault();


        try{

            const loggedUser = await login(
                email,
                password
            );


            if(loggedUser.role === "ADMIN"){

                navigate("/admin");

            }else{

                navigate("/");

            }


        }catch(error){

            alert(
                error.response?.data?.message ||
                "Login failed"
            );

        }

    };





    return (

        <div className="min-h-screen flex items-center justify-center px-5">


            <form

                onSubmit={submit}

                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"

            >


                <h1 className="text-3xl font-bold text-center mb-6">

                    Welcome Back

                </h1>



                <p className="text-gray-500 text-center mb-8">

                    Login to continue shopping

                </p>





                <div className="mb-5">


                    <label className="block text-sm font-medium mb-2">

                        Email

                    </label>



                    <input

                        type="email"

                        placeholder="you@example.com"

                        value={email}

                        onChange={
                            e=>setEmail(e.target.value)
                        }

                        autoComplete="email"

                        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition focus:ring-2 focus:ring-blue-500"

                    />


                </div>






                <div className="mb-6">


                    <label className="block text-sm font-medium mb-2">

                        Password

                    </label>



                    <input

                        type="password"

                        placeholder="••••••••"

                        value={password}

                        onChange={
                            e=>setPassword(e.target.value)
                        }

                        autoComplete="current-password"

                        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition focus:ring-2 focus:ring-blue-500"

                    />


                </div>





                <button

                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"

                >

                    Login

                </button>




            </form>


        </div>

    );

}