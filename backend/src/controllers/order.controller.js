const {

createOrder,

getMyOrders

}=require("../services/order.service");





const create = async(req,res)=>{


try{


const order = await createOrder(

req.user.id

);



res.status(201).json({

success:true,

data:order

});



}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};





const myOrders = async(req,res)=>{


try{


const orders = await getMyOrders(

req.user.id

);



res.json({

success:true,

data:orders

});



}catch(error){


res.status(400).json({

success:false,

message:error.message

});


}


};





module.exports={

create,

myOrders

};