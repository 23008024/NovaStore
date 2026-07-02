const express=require("express");

const {

get,

add,

remove

}=require("../controllers/cart.controller");


const {
protect
}=require("../middleware/auth.middleware");



const router=express.Router();



router.get(
"/",
protect,
get
);



router.post(
"/",
protect,
add
);



router.delete(
"/:id",
protect,
remove
);



module.exports=router;