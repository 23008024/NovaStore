const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const adminRoutes = require("./routes/admin.routes");

const app = express();


app.use(cors());

app.use(express.json());


// API ROUTES

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);


app.get("/", (req,res)=>{

    res.json({
        success:true,
        message:"NovaStore API running"
    });

});


module.exports = app;