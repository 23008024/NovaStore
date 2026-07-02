const {

    getDashboardStats,

    getAllProducts,

    createProduct,

    updateProduct,

    deleteProduct,

    getAllOrders,

    updateOrderStatus

} = require("../services/admin.service");



// ===================================
// DASHBOARD STATS
// ===================================

const dashboard = async (req, res) => {

    try {

        const stats = await getDashboardStats();

        res.json({

            success: true,

            data: stats

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================
// GET PRODUCTS
// ===================================

const products = async (req, res) => {

    try {

        const data = await getAllProducts();

        res.json({

            success: true,

            data

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================
// CREATE PRODUCT
// ===================================

const create = async (req, res) => {

    try {

        const product = await createProduct(req.body);

        res.status(201).json({

            success: true,

            data: product

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================
// UPDATE PRODUCT
// ===================================

const update = async (req, res) => {

    try {

        const product = await updateProduct(

            req.params.id,

            req.body

        );

        res.json({

            success: true,

            data: product

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================
// DELETE PRODUCT
// ===================================

const remove = async (req, res) => {

    try {

        await deleteProduct(req.params.id);

        res.json({

            success: true,

            message: "Product deleted"

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================
// GET ORDERS
// ===================================

const orders = async (req, res) => {

    try {

        const data = await getAllOrders();

        res.json({

            success: true,

            data

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================
// UPDATE ORDER STATUS
// ===================================

const status = async (req, res) => {

    try {

        const order = await updateOrderStatus(

            req.params.id,

            req.body.status

        );

        res.json({

            success: true,

            data: order

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};



// ===================================

module.exports = {

    dashboard,

    products,

    create,

    update,

    remove,

    orders,

    status

};