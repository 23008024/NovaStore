const { prisma } = require("../config/database");




// ===============================
// CREATE PRODUCT
// ===============================

const createProduct = async (data) => {

    const product = await prisma.product.create({

        data

    });


    return product;

};




// ===============================
// GET PRODUCTS WITH SEARCH/FILTER/PAGINATION
// ===============================

const getProducts = async (query = {}) => {


    const {

        search,

        minPrice,

        maxPrice,

        page = 1,

        limit = 10

    } = query;



    const skip = (Number(page) - 1) * Number(limit);



    const where = {};



    if(search){

        where.OR = [

            {

                name: {

                    contains: search,

                    mode: "insensitive"

                }

            },


            {

                description: {

                    contains: search,

                    mode: "insensitive"

                }

            }

        ];

    }




    if(minPrice || maxPrice){

        where.price = {};



        if(minPrice){

            where.price.gte = Number(minPrice);

        }



        if(maxPrice){

            where.price.lte = Number(maxPrice);

        }

    }




    const [products,total] = await Promise.all([


        prisma.product.findMany({

            where,


            skip,


            take: Number(limit),


            orderBy: {

                createdAt: "desc"

            }

        }),



        prisma.product.count({

            where

        })

    ]);





    return {

        products,

        pagination: {

            page: Number(page),

            limit: Number(limit),

            total,

            pages: Math.ceil(

                total / Number(limit)

            )

        }

    };


};




// ===============================
// GET PRODUCT BY ID
// ===============================

const getProductById = async (id) => {


    const product = await prisma.product.findUnique({

        where:{
            id
        }

    });



    if(!product){

        throw new Error("Product not found");

    }



    return product;

};




// ===============================
// UPDATE PRODUCT
// ===============================

const updateProduct = async (id,data)=>{


    return await prisma.product.update({

        where:{

            id

        },

        data

    });


};




// ===============================
// DELETE PRODUCT
// ===============================

const deleteProduct = async(id)=>{


    await prisma.product.delete({

        where:{

            id

        }

    });



    return true;

};





module.exports = {


    createProduct,

    getProducts,

    getProductById,

    updateProduct,

    deleteProduct


};