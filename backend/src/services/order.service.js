const { prisma } = require("../config/database");


// CREATE ORDER FROM CART

const createOrder = async (userId) => {


    const cart = await prisma.cart.findUnique({

        where:{
            userId
        },

        include:{

            items:{
                include:{
                    product:true
                }
            }

        }

    });



    if(!cart || cart.items.length === 0){

        throw new Error("Cart is empty");

    }



    let total = 0;



    for(const item of cart.items){


        if(item.product.stock < item.quantity){

            throw new Error(
                `Not enough stock for ${item.product.name}`
            );

        }


        total += item.product.price * item.quantity;


    }




    const order = await prisma.order.create({

        data:{


            userId,


            total,


            items:{


                create:cart.items.map(item=>({


                    productId:item.productId,


                    quantity:item.quantity,


                    price:item.product.price


                }))


            }


        },


        include:{


            items:{

                include:{
                    product:true
                }

            }


        }


    });






    // decrease stock

    for(const item of cart.items){


        await prisma.product.update({

            where:{
                id:item.productId
            },

            data:{

                stock:{
                    decrement:item.quantity
                }

            }


        });


    }




    // clear cart

    await prisma.cartItem.deleteMany({

        where:{
            cartId:cart.id
        }

    });



    return order;


};






// GET USER ORDERS

const getMyOrders = async(userId)=>{


    return await prisma.order.findMany({

        where:{
            userId
        },


        include:{


            items:{

                include:{
                    product:true
                }

            }


        },


        orderBy:{

            createdAt:"desc"

        }


    });


};





module.exports={

    createOrder,

    getMyOrders

};