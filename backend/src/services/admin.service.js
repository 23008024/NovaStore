const { prisma } = require("../config/database");

// ===================================
// DASHBOARD STATS
// ===================================

const getDashboardStats = async () => {

    const products = await prisma.product.count();

    const users = await prisma.user.count();

    const orders = await prisma.order.count();

    const revenue = await prisma.order.aggregate({

        _sum: {

            total: true

        }

    });

    return {

        products,

        users,

        orders,

        revenue: revenue._sum.total || 0

    };

};

// ===================================
// GET ALL PRODUCTS
// ===================================

const getAllProducts = async () => {

    return await prisma.product.findMany({

        orderBy: {

            createdAt: "desc"

        }

    });

};

// ===================================
// CREATE PRODUCT
// ===================================

const createProduct = async (data) => {

    const {

        name,

        description,

        price,

        image,

        stock

    } = data;

    return await prisma.product.create({

        data: {

            name,

            description,

            price: Number(price),

            image,

            stock: Number(stock)

        }

    });

};

// ===================================
// UPDATE PRODUCT
// ===================================

const updateProduct = async (id, data) => {

    return await prisma.product.update({

        where: {

            id

        },

        data: {

            ...data,

            price:

                data.price !== undefined

                    ? Number(data.price)

                    : undefined,

            stock:

                data.stock !== undefined

                    ? Number(data.stock)

                    : undefined

        }

    });

};

// ===================================
// DELETE PRODUCT
// ===================================

const deleteProduct = async (id) => {

    await prisma.product.delete({

        where: {

            id

        }

    });

    return true;

};

// ===================================
// GET ALL ORDERS
// ===================================

const getAllOrders = async () => {

    return await prisma.order.findMany({

        include: {

            user: true,

            items: {

                include: {

                    product: true

                }

            }

        },

        orderBy: {

            createdAt: "desc"

        }

    });

};

// ===================================
// UPDATE ORDER STATUS
// ===================================

const updateOrderStatus = async (id, status) => {

    return await prisma.order.update({

        where: {

            id

        },

        data: {

            status

        }

    });

};

// ===================================

module.exports = {

    getDashboardStats,

    getAllProducts,

    createProduct,

    updateProduct,

    deleteProduct,

    getAllOrders,

    updateOrderStatus

};