const { prisma } = require("../config/database");



const getOrCreateCart = async(userId)=>{


    let cart = await prisma.cart.findUnique({

        where:{
            userId
        },

        include:{
            items:true
        }

    });



    if(!cart){


        cart = await prisma.cart.create({

            data:{
                userId
            },

            include:{
                items:true
            }

        });


    }


    return cart;

};





const addToCart = async(userId, productId)=>{


    const cart = await getOrCreateCart(userId);



    const existingItem =
    await prisma.cartItem.findFirst({

        where:{

            cartId:cart.id,

            productId

        }

    });



    if(existingItem){


        return await prisma.cartItem.update({

            where:{
                id:existingItem.id
            },

            data:{

                quantity:{
                    increment:1
                }

            }

        });


    }



    return await prisma.cartItem.create({

        data:{

            cartId:cart.id,

            productId,

            quantity:1

        }

    });


};





const getCart = async(userId)=>{


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


    return cart;


};





const removeFromCart = async(userId,itemId)=>{


    const cart = await getOrCreateCart(userId);



    return await prisma.cartItem.delete({

        where:{
            id:itemId
        }

    });


};





module.exports={

getCart,

addToCart,

removeFromCart

};