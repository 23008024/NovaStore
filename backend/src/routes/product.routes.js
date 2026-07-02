const express=require("express");

const {
create,
getAll,
getOne,
update,
remove
}=require("../controllers/product.controller");


const {
protect
}=require("../middleware/auth.middleware");


const {
adminOnly
}=require("../middleware/role.middleware");


const router=express.Router();



router.get(
"/",
getAll
);



router.get(
"/:id",
getOne
);



router.post(
"/",
protect,
adminOnly,
create
);



router.put(
"/:id",
protect,
adminOnly,
update
);



router.delete(
"/:id",
protect,
adminOnly,
remove
);



module.exports=router;