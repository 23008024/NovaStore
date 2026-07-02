import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export default function Register(){


    const { register } = useAuth();


    const navigate = useNavigate();



    const [form,setForm] = useState({

        name:"",
        email:"",
        password:""

    });





    const submit = async(e)=>{

        e.preventDefault();


        try{


            await register(

                form.name,

                form.email,

                form.password

            );


            navigate("/login");


        }catch(error){


            alert(

                error.response?.data?.message ||

                "Registration failed"

            );


        }


    };





    return (

        <div className="min-h-screen flex items-center justify-center px-5">


            <form

                onSubmit={submit}

                className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"

            >


                <h1 className="text-3xl font-bold text-center mb-3">

                    Create Account

                </h1>



                <p className="text-gray-500 text-center mb-8">

                    Join NovaStore and start shopping

                </p>






                <div className="mb-5">


                    <label className="block text-sm font-medium mb-2">

                        Full Name

                    </label>



                    <input

                        type="text"

                        placeholder="John Doe"

                        value={form.name}

                        onChange={

                            e=>setForm({

                                ...form,

                                name:e.target.value

                            })

                        }


                        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition focus:ring-2 focus:ring-blue-500"

                    />


                </div>






                <div className="mb-5">


                    <label className="block text-sm font-medium mb-2">

                        Email Address

                    </label>



                    <input

                        type="email"

                        placeholder="john@example.com"

                        value={form.email}

                        onChange={

                            e=>setForm({

                                ...form,

                                email:e.target.value

                            })

                        }


                        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition focus:ring-2 focus:ring-blue-500"

                    />


                </div>






                <div className="mb-6">


                    <label className="block text-sm font-medium mb-2">

                        Password

                    </label>



                    <input

                        type="password"

                        placeholder="Create a password"

                        value={form.password}

                        onChange={

                            e=>setForm({

                                ...form,

                                password:e.target.value

                            })

                        }


                        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none transition focus:ring-2 focus:ring-blue-500"

                    />


                </div>






                <button

                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition"

                >

                    Create Account

                </button>





            </form>


        </div>

    );

}