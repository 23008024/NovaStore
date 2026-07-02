import { useEffect, useState } from "react";
import api from "../api/axios";


export default function Orders(){


    const [orders,setOrders] = useState([]);

    const [loading,setLoading] = useState(true);




    useEffect(()=>{


        const fetchOrders = async()=>{


            try{


                const res = await api.get("/orders");


                setOrders(res.data.data);



            }catch(error){

                console.log(error);

            }finally{

                setLoading(false);

            }


        };


        fetchOrders();


    },[]);







    if(loading){

        return (

            <div className="text-center p-10">

                Loading orders...

            </div>

        );

    }






    return (

        <div className="max-w-6xl mx-auto px-6 py-10">


            <h1 className="text-4xl font-bold mb-8">

                My Orders

            </h1>





            {

            orders.length === 0 ?


            (

                <div className="text-gray-500">

                    No orders found.

                </div>

            )


            :


            (

                <div className="space-y-6">


                {

                orders.map(order=>(


                    <div

                    key={order.id}

                    className="bg-white shadow-lg rounded-2xl p-6"

                    >


                        <div className="flex justify-between">


                            <h2 className="font-bold">

                                Order #{order.id.slice(0,8)}

                            </h2>


                            <span className="text-blue-600 font-bold">

                                {order.status}

                            </span>


                        </div>





                        <div className="mt-4">


                            {

                            order.items.map(item=>(


                                <p key={item.id}>


                                    {item.product.name}

                                    {" x "}

                                    {item.quantity}


                                </p>


                            ))

                            }


                        </div>





                        <div className="mt-4 font-bold">


                            Total: ${order.total}


                        </div>



                    </div>


                ))

                }


                </div>

            )


            }



        </div>

    );

}