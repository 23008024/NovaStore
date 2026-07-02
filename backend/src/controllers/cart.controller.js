const {

getCart,

addToCart,

removeFromCart

}=require("../services/cart.service");





const get = async(req,res)=>{


try{


const cart = await getCart(req.user.id);


res.json({

success:true,

data:cart

});


}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}

};






const add = async(req,res)=>{


try{


const item = await addToCart(

req.user.id,

req.body.productId

);



res.json({

success:true,

data:item

});


}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};





const remove = async(req,res)=>{


try{


await removeFromCart(

req.user.id,

req.params.id

);



res.json({

success:true,

message:"Removed from cart"

});


}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};





module.exports={

get,

add,

remove

};