import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Cart(){

const navigate = useNavigate();
    const [cart,setCart] = useState(null);

    const [loading,setLoading] = useState(true);




    const fetchCart = async()=>{


        try{


            const res = await api.get("/cart");


            setCart(res.data.data);



        }catch(error){

            console.log(error);

        }finally{

            setLoading(false);

        }


    };






    useEffect(()=>{


        fetchCart();


    },[]);







    const removeItem = async(id)=>{


        try{


            await api.delete(`/cart/${id}`);


            fetchCart();



        }catch(error){

            console.log(error);

        }


    };
    const checkout = async()=>{


    try{


        await api.post("/orders/checkout");


        alert("Order created successfully");


        navigate("/orders");


    }catch(error){


        alert(

            error.response?.data?.message ||

            "Checkout failed"

        );


    }


};







    if(loading){

        return (

            <div className="text-center p-10">

                Loading cart...

            </div>

        );

    }







    if(!cart || cart.items.length === 0){


        return (

            <div className="text-center py-20">


                <h1 className="text-3xl font-bold">

                    Your cart is empty

                </h1>


                <p className="text-gray-500 mt-3">

                    Add products and start shopping.

                </p>


            </div>

        );

    }






    const total = cart.items.reduce(

        (sum,item)=>

            sum +

            item.product.price *

            item.quantity

        ,0

    );







    return (

        <div className="max-w-6xl mx-auto px-6 py-10">


            <h1 className="text-4xl font-bold mb-8">

                Shopping Cart

            </h1>





            <div className="space-y-5">


                {

                    cart.items.map(item=>(


                        <div

                        key={item.id}

                        className="bg-white shadow rounded-2xl p-5 flex justify-between items-center"

                        >



                            <div className="flex items-center gap-5">


                                <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center text-3xl">

                                    🛒

                                </div>



                                <div>


                                    <h2 className="font-bold text-lg">

                                        {item.product.name}

                                    </h2>


                                    <p className="text-gray-500">

                                        ${item.product.price}

                                    </p>



                                    <p>

                                        Quantity: {item.quantity}

                                    </p>


                                </div>



                            </div>






                            <div className="text-right">


                                <p className="font-bold text-blue-600">

                                    $

                                    {

                                    item.product.price *

                                    item.quantity

                                    }

                                </p>



                                <button

                                onClick={()=>removeItem(item.id)}

                                className="mt-3 text-red-500"

                                >

                                    Remove

                                </button>


                            </div>



                        </div>


                    ))

                }


            </div>






            <div className="mt-10 bg-white shadow rounded-2xl p-6">


                <div className="flex justify-between text-xl font-bold">


                    <span>

                        Total

                    </span>



                    <span className="text-blue-600">

                        ${total.toFixed(2)}

                    </span>


                </div>


<button
    onClick={checkout}
    className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
>

    Proceed To Checkout

</button>


                


            </div>





        </div>

    );

}